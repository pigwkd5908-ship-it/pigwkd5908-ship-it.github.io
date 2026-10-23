(()=>{
'use strict';
const $=id=>document.getElementById(id);
const params=new URLSearchParams(location.search);
const id=params.get('id'),source=params.get('source');
const data=Array.isArray(window.HAPPYLAND_LISTINGS)?window.HAPPYLAND_LISTINGS:[];
const m=data.find(x=>x.id===id&&x.source===source&&(!x.status||x.status==='active'));
if(!m){$('propertyTitle').textContent='매물을 찾을 수 없습니다';$('propertyNotFound').hidden=false;return;}
document.title=(m.title||'매물 상세')+' | 해피랜드공인중개사사무소';
$('propertyTitle').textContent=m.title||'매물 상세정보';
const fmt=n=>Number(n).toLocaleString('ko-KR');
const isNum=v=>v!==null&&v!==undefined&&v!==''&&Number.isFinite(Number(v));
const price=(isNum(m.deposit)?(m.type==='전세'?'전세 '+fmt(m.deposit)+'만원':'보증금 '+fmt(m.deposit)+'만원 / 월세 '+(isNum(m.rent)?fmt(m.rent)+'만원':'상담 문의')):'가격 문의');
$('propertyPrice').textContent=price;
$('propertyBody').hidden=false;
const detail=[
 ['소재지',m.address],['건축물 용도',m.buildingUse],['거래 형태',m.type==='전세'?'전세':'월세'],
 ['보증금',isNum(m.deposit)?fmt(m.deposit)+'만원':'확인 필요'],['월세',m.type==='전세'?'해당 없음':isNum(m.rent)?fmt(m.rent)+'만원':'확인 필요'],
 ['전용면적',isNum(m.area)?m.area+'㎡':null],['방 수',isNum(m.rooms)?m.rooms+'개':null],['욕실 수',isNum(m.bathrooms)?m.bathrooms+'개':null],
 ['사용승인일',m.approvalDate],['입주가능일',m.moveIn],['해당 층',m.floor],['전체 층수',isNum(m.totalFloors)?m.totalFloors+'층':null],
 ['방향',m.direction?m.direction+(m.directionBasis?' ('+m.directionBasis+')':''):null],
 ['주차 가능 여부',m.parking],['건축물대장상 총 주차대수',isNum(m.parkingCount)?m.parkingCount+'대':null],
];
for(const [label,value] of detail){
 const node=document.createElement('div');const k=document.createElement('span'),v=document.createElement('strong');
 k.textContent=label;v.textContent=(value===null||value===undefined||value==='')?'확인 필요':value;
 node.append(k,v);$('propertyFacts').appendChild(node);
}
function feeBox(label,value){const node=document.createElement('article'),title=document.createElement('h3'),p=document.createElement('p');title.textContent=label;p.textContent=value;node.append(title,p);$('propertyFees').appendChild(node);}
feeBox('월 관리비',isNum(m.fee)?fmt(m.fee)+'만원'+(m.feeType?' · '+m.feeType:''):'확인 필요');
feeBox('관리비 포함 항목',Array.isArray(m.feeIncluded)&&m.feeIncluded.length?m.feeIncluded.join(', '):'확인 필요');
feeBox('별도 부담 항목',Array.isArray(m.feeExcluded)&&m.feeExcluded.length?m.feeExcluded.join(', '):'확인 필요');
if(m.feeBreakdown)feeBox('항목별 관리비',m.feeBreakdown);
else if(isNum(m.fee)&&Number(m.fee)>=10&&m.feeType==='정액'&&m.feeUnknownBreakdown)feeBox('항목별 관리비','중개의뢰인이 비목별 금액 자료를 제공하지 않아 확인되지 않았습니다.');
$('propertyDescription').textContent=m.desc||'추가 설명은 전화로 문의해 주세요.';
const imgs=(Array.isArray(m.images)&&m.images.length?m.images:(m.image?[m.image]:[])).filter(Boolean).slice(0,20);
if(!imgs.length){const info=document.createElement('p');info.textContent='등록된 사진이 없습니다. 원본 광고 또는 상담으로 확인해 주세요.';$('propertyGallery').append(info);}
imgs.forEach((src,i)=>{
  const a=document.createElement('a');a.href=src;
  a.addEventListener('click',(ev)=>{ev.preventDefault();PHOTO_GALLERY.open(imgs,m.title,m.url);});
  const img=document.createElement('img');img.src=src;img.alt='매물 사진 '+(i+1);img.loading=i?'lazy':'eager';
  img.addEventListener('error',()=>a.remove());a.append(img);$('propertyGallery').append(a);
});
if(typeof m.url==='string'&&/^https?:\/\//.test(m.url)){$('originalAd').hidden=false;$('originalAd').href=m.url;}
})();
