const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('siteHeader');
const yearEl = document.getElementById('year');

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
window.addEventListener('scroll', () => {
  if (!header) return;
  header.classList.toggle('scrolled',window.scrollY>8);
});

// A single accessible photo gallery for every listing, including the original H-101 detail page.
const PHOTO_GALLERY = (() => {
  const root=document.getElementById('photoLightbox');
  if (!root) return {open:()=>{}};
  const img=document.getElementById('lightboxImage');
  const title=document.getElementById('lightboxTitle');
  const counter=document.getElementById('lightboxCounter');
  const thumbs=document.getElementById('lightboxThumbs');
  const external=document.getElementById('lightboxExternal');
  const prev=document.getElementById('lightboxPrev');
  const next=document.getElementById('lightboxNext');
  let photos=[],index=0,lastFocus=null;
  function render(){
    if (!photos.length) return;
    img.src=photos[index];
    img.alt=`매물 사진 ${index+1} / ${photos.length}`;
    counter.textContent=`${index+1} / ${photos.length}`;
    prev.disabled=photos.length<2;
    next.disabled=photos.length<2;
    thumbs.replaceChildren();
    photos.forEach((src,i)=>{
      const btn=document.createElement('button');
      btn.type='button';btn.className='lightbox-thumb'+(i===index?' active':'');
      btn.setAttribute('aria-label',`${i+1}번 사진 보기`);
      btn.setAttribute('aria-pressed',i===index?'true':'false');
      const th=document.createElement('img');th.src=src;th.alt='';th.loading='lazy';
      btn.append(th);btn.addEventListener('click',()=>{index=i;render();});thumbs.append(btn);
    });
  }
  function close(){
    if (root.hidden) return;
    root.hidden=true;root.setAttribute('aria-hidden','true');
    document.body.classList.remove('lightbox-open');
    if(lastFocus && typeof lastFocus.focus==='function') lastFocus.focus();
  }
  function open(items,heading,href){
    photos=[...new Set((items||[]).filter(s=>typeof s==='string'&&!!s.trim()))];
    if(!photos.length)return;
    index=0;lastFocus=document.activeElement;
    title.textContent=heading||'매물 사진 보기';
    const valid=typeof href==='string' && (/^https?:\/\//i.test(href)||/^listing-101\.html$/.test(href));
    external.hidden=!valid;
    if(valid){
      external.href=href;
      if(href.startsWith('http')){external.target='_blank';external.rel='noopener noreferrer';}
      else {external.removeAttribute('target');}
    }
    root.hidden=false;root.setAttribute('aria-hidden','false');
    document.body.classList.add('lightbox-open');
    render();root.querySelector('.lightbox-close').focus();
  }
  root.querySelectorAll('[data-gallery-close]').forEach(el=>el.addEventListener('click',close));
  prev.addEventListener('click',()=>{index=(index-1+photos.length)%photos.length;render();});
  next.addEventListener('click',()=>{index=(index+1)%photos.length;render();});
  document.addEventListener('keydown',(e)=>{
    if(root.hidden)return;
    if(e.key==='Escape'){close();}
    if(e.key==='ArrowLeft'){index=(index-1+photos.length)%photos.length;render();}
    if(e.key==='ArrowRight'){index=(index+1)%photos.length;render();}
    if(e.key==='Tab'){
      const focusables=[...root.querySelectorAll('button:not([disabled]),a:not([hidden])')].filter(e=>e.offsetParent!==null);
      const first=focusables[0],last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault();}
      else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault();}
    }
  });
  return {open,close};
})();

const EXTERNAL_LISTINGS = Array.isArray(window.HAPPYLAND_LISTINGS) ? window.HAPPYLAND_LISTINGS : [];

(function initPropertyDirectory(){
  const grid=document.getElementById('marketGrid');
  if(!grid)return;
  const search=document.getElementById('marketSearch');
  const platform=document.getElementById('marketPlatform');
  const deposit=document.getElementById('marketDeposit');
  const sort=document.getElementById('marketSort');
  const status=document.getElementById('marketStatus');
  const total=document.getElementById('marketTotal');
  const more=document.getElementById('marketMore');
  const empty=document.getElementById('marketEmpty');
  let visibleCount=12;
  total.textContent=String(EXTERNAL_LISTINGS.filter(m => !m.status || m.status === 'active').length);
  [...new Set(EXTERNAL_LISTINGS.map(m=>m.source))].filter(Boolean).forEach(source=>{
    if(![...platform.options].some(opt=>opt.value===source)){
      const option=document.createElement('option');option.value=source;option.textContent=source;platform.append(option);
    }
  });
  const formatPrice=(n)=>Number(n).toLocaleString('ko-KR');
  const knownPrice=(m)=>Number.isFinite(m.deposit) && (Number.isFinite(m.rent) || m.type==='전세');
  const encodeText=(txt)=>String(txt).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const photosOf=(m)=>[...new Set(((Array.isArray(m.images)&&m.images.length)?m.images:(m.image?[m.image]:[])).filter(x=>typeof x==='string'&&x.trim()))];
  const hasLocalDetails=(m)=>!!(m.address&&m.buildingUse&&Number.isFinite(Number(m.area))&&m.approvalDate&&m.floor&&m.totalFloors!==null&&m.totalFloors!==undefined);
  const makeCard=(m)=>{
    const detailHref=m.local&&m.id==='H-101'?'listing-101.html':hasLocalDetails(m)?'property.html?id='+encodeURIComponent(m.id)+'&source='+encodeURIComponent(m.source):m.url||'tel:01065043281';
    const card=document.createElement('article');card.className='market-card';
    const a=document.createElement('a');a.className='market-photo';a.href=detailHref;
    a.setAttribute('aria-label',m.title+' 매물 사진 및 광고 보기');
    if(/^https?:/i.test(detailHref)){a.target='_blank';a.rel='noopener noreferrer';}
    const fallback=document.createElement('div');fallback.className='market-noimage';
    fallback.innerHTML='<span class="house-icon" aria-hidden="true">⌂</span><strong>'+encodeText(m.source)+'</strong><small>상세 사진은 광고에서 확인</small>';
    a.appendChild(fallback);
    const photos=photosOf(m);
    // For old external ads without an image URL, try the previously agreed filename as a fallback.
    const photoSrc=photos[0] || ('images/listings/'+encodeURIComponent(m.id)+'.jpg');
    const img=document.createElement('img');img.src=photoSrc;
    img.alt=m.title+' 매물 대표 사진';img.loading='lazy';
    img.addEventListener('load',()=>{fallback.style.display='none';});
    img.addEventListener('error',()=>{img.remove();fallback.style.display='flex';});
    a.appendChild(img);
    if(photos.length>1){
      const count=document.createElement('span');count.className='market-photo-count';count.textContent='사진 '+photos.length+'장';a.appendChild(count);
      a.addEventListener('click',(e)=>{e.preventDefault();PHOTO_GALLERY.open(photos,m.title,detailHref);});
    }
    const source=document.createElement('span');source.className='badge-source';source.textContent=m.source;a.appendChild(source);
    const content=document.createElement('div');content.className='market-card-content';
    const meta=document.createElement('div');meta.className='market-card-top';
    const loc=document.createElement('span');loc.className='market-card-place';loc.textContent=m.district;
    const id=document.createElement('span');id.className='market-card-id';id.textContent='#'+m.id;
    meta.append(loc,id);
    const title=document.createElement('h3');title.textContent=m.title;
    const price=document.createElement('p');price.className='price'+(knownPrice(m)?'':' unverified');
    if(!knownPrice(m))price.textContent='가격 확인 필요';
    else if(m.type==='전세')price.textContent='전세 '+formatPrice(m.deposit)+'만원';
    else price.textContent=formatPrice(m.deposit)+' / '+formatPrice(m.rent)+'만원';
    // 매물 카드에는 핵심 요약만 표시합니다. 긴 원문은 상세 페이지(property.html)에 그대로 유지합니다.
    const makeSummary=(description)=>{
      const raw=String(description||'').replace(/\r/g,'').trim();
      if(!raw)return '';
      const lines=raw.split(/\n+/).map(x=>x.trim().replace(/^[✓✔✅•\-]+\s*/,''))
        .filter(x=>x && !/^\[?(?:한줄\s*요약|체크리스트|가격\s*정보|위치\s*\/\s*교통|방\s*구조|옵션|담당자|상세\s*설명|안내사항|주의사항)\]?[:：]?$/i.test(x));
      const first=lines.find(x=>!/^\d+[.)]\s/.test(x) && x.length>=6) || lines[0] || '';
      // 줄바꿈과 체크리스트로 길어진 글을 첫 문구로 요약하며, 상세 내용은 삭제하지 않습니다.
      return first.length>78?first.slice(0,77).trimEnd()+'…':first;
    };
    const subtitle=document.createElement('p');subtitle.className='subline';subtitle.textContent=makeSummary(m.desc);
    const quick=document.createElement('p');quick.className='legal-quickline';
    const facts=[];
    if(m.area!==null&&m.area!==undefined)facts.push('전용 '+m.area+'㎡');
    if(m.floor)facts.push(m.floor+'/'+(m.totalFloors??'?')+'층');
    if(m.rooms!==null&&m.rooms!==undefined)facts.push('방 '+m.rooms+'개');
    if(m.fee!==null&&m.fee!==undefined)facts.push('관리비 '+m.fee+'만원');
    quick.textContent=facts.join(' · ');
    const notice=document.createElement('span');notice.className='legal-status-note';
    if(!hasLocalDetails(m))notice.textContent='추가 상세정보는 원본 광고에서 확인';
    else if(m.parking==='확인 필요'||!m.parking)notice.textContent='주차 가능 여부 상담 확인 필요';
    const cta=document.createElement('a');cta.className='action-link';cta.href=detailHref;
    cta.textContent=(m.local&&m.id==='H-101'||hasLocalDetails(m))?'매물 상세정보 보기 ↗':/^https?:/i.test(m.url)?m.source+' 광고 열기 ↗':'전화 문의하기 ↗';
    if(/^https?:/i.test(detailHref)){cta.target='_blank';cta.rel='noopener noreferrer';}
    content.append(meta,title,price,subtitle);
    if(facts.length)content.append(quick);
    if(notice.textContent)content.append(notice);
    content.append(cta);card.append(a,content);
    return card;
  };
  const list=()=>{
    const q=search.value.trim().toLowerCase();
    const found=EXTERNAL_LISTINGS.filter(m=>{
      if(m.status && m.status!=='active')return false;
      if(platform.value!=='all' && m.source!==platform.value)return false;
      if(q && ![m.id,m.title,m.desc,m.district,m.source].join(' ').toLowerCase().includes(q))return false;
      const d=m.deposit;
      if(deposit.value==='under500' && !(d!==null && d<=500))return false;
      if(deposit.value==='500to1000' && !(d!==null && d>500 && d<=1000))return false;
      if(deposit.value==='over1000' && !(d!==null && d>1000))return false;
      if(deposit.value==='unknown' && d!==null)return false;
      return true;
    });
    if(sort.value==='rentLow')found.sort((a,b)=>(a.rent??999999)-(b.rent??999999));
    if(sort.value==='depositLow')found.sort((a,b)=>(a.deposit??999999)-(b.deposit??999999));
    return found;
  };
  const render=()=>{
    const found=list();
    grid.replaceChildren(...found.slice(0,visibleCount).map(makeCard));
    status.textContent='연결된 광고 '+found.length+'건 · '+Math.min(found.length,visibleCount)+'건 표시';
    more.hidden=found.length<=visibleCount;empty.hidden=found.length!==0;
  };
  [search,platform,deposit,sort].forEach(el=>el.addEventListener(el===search?'input':'change',()=>{visibleCount=12;render();}));
  more.addEventListener('click',()=>{visibleCount+=12;render();});
  render();
})();

// Original 101 detail page photo gallery (6 original photos).
(function initStaticDetailGallery(){
  const links=[...document.querySelectorAll('[data-photo-gallery="101"]')];
  if(!links.length)return;
  const pics=links.map(link=>link.getAttribute('href'));
  links.forEach((link)=>link.addEventListener('click',(e)=>{
    e.preventDefault();PHOTO_GALLERY.open(pics,'신림동 1463-60 · 101호','');
  }));
})();
