const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const header = document.getElementById('siteHeader');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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
  if (window.scrollY > 8) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

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
  // 관리 화면에서 새로 추가한 플랫폼도 필터에서 선택할 수 있습니다.
  [...new Set(EXTERNAL_LISTINGS.map(m=>m.source))].filter(Boolean).forEach(source=>{
    if(![...platform.options].some(opt=>opt.value===source)){
      const option=document.createElement('option');option.value=source;option.textContent=source;platform.append(option);
    }
  });
  const formatPrice=(n)=>Number(n).toLocaleString('ko-KR');
  const knownPrice=(m)=>Number.isFinite(m.deposit) && (Number.isFinite(m.rent) || m.type==='전세');
  const encodeText=(txt)=>String(txt).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const makeCard=(m)=>{
    const card=document.createElement('article');
    card.className='market-card';
    const a=document.createElement('a');
    a.className='market-photo';a.href=m.url;a.setAttribute('aria-label',m.title+' 광고 보기');
    if(/^https?:/i.test(m.url)){a.target='_blank';a.rel='noopener noreferrer';}
    const fallback=document.createElement('div');fallback.className='market-noimage';
    fallback.innerHTML='<span class="house-icon" aria-hidden="true">⌂</span><strong>'+encodeText(m.source)+'</strong><small>상세 사진은 광고에서 확인</small>';
    a.appendChild(fallback);
    // 실제 원본 사진이 제공되면 images/listings/<광고번호>.jpg 파일만 올려도 자동 반영됩니다.
    // 사진이 없는 광고는 실제 사진인 것처럼 다른 매물 사진으로 대체하지 않습니다.
    const photoSrc = m.image || ('images/listings/' + encodeURIComponent(m.id) + '.jpg');
    const img=document.createElement('img');
    img.src=photoSrc;img.alt=m.title+' 매물 대표 사진';img.loading='lazy';
    img.addEventListener('load',()=>{fallback.style.display='none';});
    img.addEventListener('error',()=>{img.remove();fallback.style.display='flex';});
    a.appendChild(img);
    const source=document.createElement('span');source.className='badge-source';source.textContent=m.source;a.appendChild(source);
    const content=document.createElement('div');content.className='market-card-content';
    const meta=document.createElement('div');meta.className='market-card-top';
    const loc=document.createElement('span');loc.className='market-card-place';loc.textContent=m.district;
    const id=document.createElement('span');id.className='market-card-id';id.textContent='#'+m.id;
    meta.append(loc,id);
    const title=document.createElement('h3');title.textContent=m.title;
    const price=document.createElement('p');price.className='price'+(knownPrice(m)?'':' unverified');
    if(!knownPrice(m)){price.textContent='가격 확인 필요';}
    else if(m.type==='전세'){price.textContent='전세 '+formatPrice(m.deposit)+'만원';}
    else {price.textContent=formatPrice(m.deposit)+' / '+formatPrice(m.rent)+'만원';}
    const subtitle=document.createElement('p');subtitle.className='subline';subtitle.textContent=m.desc;
    const cta=document.createElement('a');cta.className='action-link';cta.href=m.url||'tel:01065043281';cta.textContent=m.local?'상세 페이지 보기 ↗':/^https?:/i.test(m.url)?m.source+' 광고 열기 ↗':'전화 문의하기 ↗';
    if(/^https?:/i.test(m.url)){cta.target='_blank';cta.rel='noopener noreferrer';}
    content.append(meta,title,price,subtitle,cta);
    card.append(a,content);
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
    if(sort.value==='rentLow'){found.sort((a,b)=>(a.rent??999999)-(b.rent??999999));}
    if(sort.value==='depositLow'){found.sort((a,b)=>(a.deposit??999999)-(b.deposit??999999));}
    return found;
  };
  const render=()=>{
    const found=list();
    grid.replaceChildren(...found.slice(0,visibleCount).map(makeCard));
    status.textContent='연결된 광고 '+found.length+'건 · '+Math.min(found.length,visibleCount)+'건 표시';
    more.hidden=found.length<=visibleCount;
    empty.hidden=found.length!==0;
  };
  [search,platform,deposit,sort].forEach(el=>el.addEventListener(el===search?'input':'change',()=>{visibleCount=12;render();}));
  more.addEventListener('click',()=>{visibleCount+=12;render();});
  render();
})();
