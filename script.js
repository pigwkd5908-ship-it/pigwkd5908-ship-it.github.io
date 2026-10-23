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

const EXTERNAL_LISTINGS = [
  {
    "id": "H-101",
    "source": "해피랜드",
    "district": "신림동",
    "type": "오피스텔",
    "deposit": 200,
    "rent": 28,
    "fee": 7,
    "title": "신림동 1463-60 · 101호",
    "desc": "분리형 원룸형 오피스텔 · 전용 19.83㎡ · 1층",
    "image": "images/room-main.jpg",
    "url": "listing-101.html",
    "local": true,
    "verified": "사용자 제공 광고 자료"
  },
  {
    "id": "4800770",
    "source": "당근부동산",
    "district": "신림동",
    "type": "투룸 이상",
    "deposit": 500,
    "rent": 30,
    "fee": null,
    "title": "신림동 투룸 이상",
    "desc": "신림역 7분 · 2층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4800770/01M5H3W12HDRXDV7FSBHHMEX6V.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4800770",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4800680",
    "source": "당근부동산",
    "district": "신림동",
    "type": "원룸",
    "deposit": 300,
    "rent": 40,
    "fee": null,
    "title": "신림동 원룸",
    "desc": "신림역 7분 · 3층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4800680/01M5H3N5H3Z5BVDAN8S51E8Z9N.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4800680",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4698669",
    "source": "당근부동산",
    "district": "신대방동",
    "type": "원룸",
    "deposit": 300,
    "rent": 40,
    "fee": null,
    "title": "신대방동 원룸",
    "desc": "신대방역 5분 · 1층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4698669/01M5K6MPZV0KWM1XGB0VGSV24X.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4698669",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4790169",
    "source": "당근부동산",
    "district": "신림동",
    "type": "원룸",
    "deposit": 100,
    "rent": 45,
    "fee": null,
    "title": "신림동 원룸",
    "desc": "서원역 13분 · 1층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4790169/01M5EN4YFFFWECF38FB1VZ4TY4.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4790169",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4790109",
    "source": "당근부동산",
    "district": "신림동",
    "type": "투룸 이상",
    "deposit": 500,
    "rent": 50,
    "fee": null,
    "title": "신림동 투룸 이상",
    "desc": "서원역 13분 · 반지하",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4790109/01M5EMZDGWNRYXRG6AAK5R4MM2.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4790109",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4790021",
    "source": "당근부동산",
    "district": "신림동",
    "type": "원룸",
    "deposit": 200,
    "rent": 38,
    "fee": null,
    "title": "신림동 원룸",
    "desc": "서울대벤처타운역 11분 · 2층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4790021/01M5EMSCVGYH1A9SXV2HZNED45.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4790021",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4789935",
    "source": "당근부동산",
    "district": "신림동",
    "type": "원룸",
    "deposit": 100,
    "rent": 28,
    "fee": null,
    "title": "신림동 원룸",
    "desc": "신림동 · 반지하",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4789935/01M5EMK0MG7S307Q4K36V8EC8C.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4789935",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4785747",
    "source": "당근부동산",
    "district": "신림동",
    "type": "원룸",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "신림동 원룸",
    "desc": "신림역 7분 · 2층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4785747/01M5E8WKVV13ATBVNM8TZ3S7VH.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4785747",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4781248",
    "source": "당근부동산",
    "district": "봉천동",
    "type": "분리형 원룸",
    "deposit": 1000,
    "rent": 65,
    "fee": null,
    "title": "봉천동 분리형 원룸",
    "desc": "서울대입구역 12분 · 3층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4781248/01M5CF15DSSATK059EEZGNB571.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4781248",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "4800842",
    "source": "당근부동산",
    "district": "가산동",
    "type": "원룸",
    "deposit": 200,
    "rent": 30,
    "fee": null,
    "title": "가산동 원룸",
    "desc": "가산동 · 2층",
    "image": "https://img.kr.gcp-karroter.net/realty/article/4800842/01M5HC8NFXD9G6W2S2072V5VBK.png?f=webp&q=95&s=300x300&service=realty&t=crop",
    "url": "https://realty.daangn.com/articles/4800842",
    "local": false,
    "verified": "공개 광고 표시 가격"
  },
  {
    "id": "20068572",
    "source": "피터팬",
    "district": "신림동",
    "type": "전세",
    "deposit": 26500,
    "rent": null,
    "fee": null,
    "title": "신림동 전세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20068572?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063636",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 1000,
    "rent": 45,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063636?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063824",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 17300,
    "rent": 31,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063824?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20064871",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 300,
    "rent": 43,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20064871?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20064608",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 1000,
    "rent": 48,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20064608?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063677",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 1000,
    "rent": 52,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063677?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063630",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 45,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063630?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063624",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 47,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063624?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063579",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 1000,
    "rent": 50,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063579?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20063458",
    "source": "피터팬",
    "district": "봉천동",
    "type": "전세",
    "deposit": 33600,
    "rent": null,
    "fee": null,
    "title": "봉천동 전세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20063458?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20054991",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 100,
    "rent": 21,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20054991?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20054985",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20054985?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20048814",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 500,
    "rent": 55,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20048814?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20025698",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 100,
    "rent": 20,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20025698?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20022544",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 500,
    "rent": 70,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20022544?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20010912",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20010912?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20010910",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 200,
    "rent": 28,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20010910?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20010908",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20010908?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20009821",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 1500,
    "rent": 120,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20009821?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "20009797",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/20009797?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19996986",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 200,
    "rent": 29,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19996986?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19979161",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 1000,
    "rent": 52,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19979161?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978642",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 500,
    "rent": 45,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978642?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978640",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 500,
    "rent": 45,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978640?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978638",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 1000,
    "rent": 45,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978638?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978635",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 49,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978635?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978628",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 46,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978628?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978622",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 46,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978622?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978617",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 48,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978617?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978596",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 500,
    "rent": 52,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978596?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19978517",
    "source": "피터팬",
    "district": "신림동",
    "type": "월세",
    "deposit": 500,
    "rent": 45,
    "fee": null,
    "title": "신림동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19978517?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "19963753",
    "source": "피터팬",
    "district": "봉천동",
    "type": "월세",
    "deposit": 300,
    "rent": 40,
    "fee": null,
    "title": "봉천동 월세",
    "desc": "상세 조건·사진은 피터팬 광고에서 확인",
    "image": "",
    "url": "https://www.peterpanz.com/link/short/19963753?u=3555995&d=etc",
    "local": false,
    "verified": "광고 제목 가격"
  },
  {
    "id": "50599187",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50599187",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50599187",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50470346",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50470346",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50470346",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50599159",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50599159",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50599159",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50599191",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50599191",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50599191",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50139493",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50139493",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50139493",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50412753",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50412753",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50412753",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50581883",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50581883",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50581883",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50645801",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50645801",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50645801",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50766770",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50766770",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50766770",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50787006",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50787006",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50787006",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "50508054",
    "source": "직방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "직방 매물 · 50508054",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "https://sp.zigbang.com/share/oneroom/50508054",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "DB-VKGT",
    "source": "다방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "다방 매물 · VKGT",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "http://redirect.dabangapp.com/cg/VKGT",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "DB-XXQy",
    "source": "다방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "다방 매물 · XXQy",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "http://redirect.dabangapp.com/cg/XXQy",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "DB-bPU7",
    "source": "다방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "다방 매물 · bPU7",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "http://redirect.dabangapp.com/cg/bPU7",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "DB-UwnG",
    "source": "다방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "다방 매물 · UwnG",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "http://redirect.dabangapp.com/cg/UwnG",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  },
  {
    "id": "DB-QPp8",
    "source": "다방",
    "district": "지역 확인",
    "type": "매물 광고",
    "deposit": null,
    "rent": null,
    "fee": null,
    "title": "다방 매물 · QPp8",
    "desc": "외부 광고에서 가격·사진 확인",
    "image": "",
    "url": "http://redirect.dabangapp.com/cg/QPp8",
    "local": false,
    "verified": "외부 상세 정보 확인 필요"
  }
];

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
  total.textContent=String(EXTERNAL_LISTINGS.length);
  const formatPrice=(n)=>Number(n).toLocaleString('ko-KR');
  const knownPrice=(m)=>Number.isFinite(m.deposit) && (Number.isFinite(m.rent) || m.type==='전세');
  const encodeText=(txt)=>String(txt).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const makeCard=(m)=>{
    const card=document.createElement('article');
    card.className='market-card';
    const a=document.createElement('a');
    a.className='market-photo';a.href=m.url;a.setAttribute('aria-label',m.title+' 광고 보기');
    if(!m.local){a.target='_blank';a.rel='noopener noreferrer';}
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
    if(!knownPrice(m)){price.textContent='광고에서 가격 확인';}
    else if(m.type==='전세'){price.textContent='전세 '+formatPrice(m.deposit)+'만원';}
    else {price.textContent=formatPrice(m.deposit)+' / '+formatPrice(m.rent)+'만원';}
    const subtitle=document.createElement('p');subtitle.className='subline';subtitle.textContent=m.desc;
    const cta=document.createElement('a');cta.className='action-link';cta.href=m.url;cta.textContent=m.local?'상세 페이지 보기 ↗':m.source+' 광고 열기 ↗';
    if(!m.local){cta.target='_blank';cta.rel='noopener noreferrer';}
    content.append(meta,title,price,subtitle,cta);
    card.append(a,content);
    return card;
  };
  const list=()=>{
    const q=search.value.trim().toLowerCase();
    const found=EXTERNAL_LISTINGS.filter(m=>{
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
