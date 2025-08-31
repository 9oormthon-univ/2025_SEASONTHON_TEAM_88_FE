// 상품 데이터를 관리하는 파일입니다.

// 카테고리 데이터
export const categories = [
  { name: '케이크', icon: '🎂' },
  { name: '쿠키', icon: '🍪' },
  { name: '음료', icon: '🥤' },
  { name: '베이커리', icon: '🥐' },
  { name: '떡', icon: '🍡' },
  { name: '전통간식', icon: '🍘' },
  { name: '초콜릿', icon: '🍫' },
  { name: '사탕', icon: '🍬' },
  { name: '건강식품', icon: '🌿' },
  { name: '선물세트', icon: '🎁' },
];

// 추천 상품 데이터 ("이 상품, 토리님도 좋아할 거예요")
export const recommendedProducts = [
  {
    id: 1,
    brand: '러브기프트',
    name: '커플 맞춤 캔들 세트',
    price: 24500,
    imageUrl: 'https://placehold.co/160x160/E4D9F8/8A3DF3?text=Candle',
    isBookmarked: true,
  },
  {
    id: 2,
    brand: '헤키모먼트',
    name: '감성 꽃다발 + 미니 카드 패키지',
    price: 19900,
    imageUrl: 'https://placehold.co/160x160/F8D9E4/D96690?text=Flower',
    isBookmarked: false,
  },
  {
    id: 3,
    brand: '스위트쉐크',
    name: '프리미엄 초콜릿 기프트 박스',
    price: 32000,
    imageUrl: 'https://placehold.co/160x160/E6D5C3/8C6442?text=Chocolate',
    isBookmarked: false,
  },
  {
    id: 4,
    brand: '아늑',
    name: '포근한 담요',
    price: 28000,
    imageUrl: 'https://placehold.co/160x160/D4E2D4/6A8A6B?text=Blanket',
    isBookmarked: true,
  },
];

// 가격대별 인기 상품 데이터
export const rankedProducts = [
  {
    id: 10,
    brand: '플라워데이',
    name: '미니 드라이 플라워 부케',
    price: 12900,
    imageUrl: 'https://placehold.co/120x120/E2F0D9/6DA34D?text=Bouquet',
  },
  {
    id: 11,
    brand: '스위트오먼트',
    name: '수제 초콜릿 6구 세트',
    price: 11500,
    imageUrl: 'https://placehold.co/120x120/DBCDF0/6341A3?text=Choco',
  },
  {
    id: 12,
    brand: '스위트오먼트',
    name: '향기 테라피 미니 캔들',
    price: 13800,
    imageUrl: 'https://placehold.co/120x120/F5E6CC/D9A95C?text=Scent',
  },
  {
    id: 13,
    brand: '소색플러스',
    name: '수제 쿠키 선물 박스',
    price: 11800,
    imageUrl: 'https://placehold.co/120x120/F0E2D8/BF8F73?text=Cookie',
  },
  {
    id: 14,
    brand: '베어스테이',
    name: '미니 곰돌이 인형 (기념일 포장 포함)',
    price: 10500,
    imageUrl: 'https://placehold.co/120x120/DDEBF7/7B9EC7?text=Bear',
  },
  {
    id: 15,
    brand: '아로마스토리',
    name: '미니 디퓨저 (자체제작향)',
    price: 13200,
    imageUrl: 'https://placehold.co/120x120/D9E9F0/6B8E99?text=Diffuser',
  },
  {
    id: 16,
    brand: '우드라이트',
    name: 'LED 우드 무드등',
    price: 14500,
    imageUrl: 'https://placehold.co/120x120/C6B9A8/8C7B6C?text=Mood+Light',
  },
  {
    id: 17,
    brand: '티하우스',
    name: '프리미엄 티백 세트',
    price: 12000,
    imageUrl: 'https://placehold.co/120x120/B2D8B2/5A825A?text=Tea',
  },
  {
    id: 18,
    brand: '해치오먼트',
    name: '캘리그라피 메시지 카드',
    price: 9900,
    imageUrl: 'https://placehold.co/120x120/F5F5F5/4A4A4A?text=Card',
  },
];
