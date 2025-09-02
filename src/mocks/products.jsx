// 상품 데이터를 관리하는 파일입니다.

import Bear from '../assets/images/bear.svg';
import Bouquet from '../assets/images/bouquet.svg';
import Card from '../assets/images/card.svg';
import Choco from '../assets/images/choco.svg';
import Cookie from '../assets/images/cookie.svg';
import Diffuser from '../assets/images/diffuser.svg';
import MoodLight from '../assets/images/mood+light.svg';
import Scent from '../assets/images/scent.svg';
import Tea from '../assets/images/tea.svg';
import Flower from '../assets/images/flower.svg';
import Chocolate from '../assets/images/chocolate.svg';
import Candle from '../assets/images/candle.svg';
// 카테고리 데이터
export const CATEGORIES = {
  식품: [
    { name: '케이크', icon: 'cakeIcon' },
    { name: '쿠키', icon: 'cookieIcon' },
    { name: '음료', icon: 'drinkIcon' },
    { name: '베이커리', icon: 'bakeryIcon' },
    { name: '떡', icon: 'riceCakeIcon' },
    { name: '전통간식', icon: 'traditionalSnackIcon' },
    { name: '초콜릿', icon: 'chocolateIcon' },
    { name: '사탕', icon: 'candyIcon' },
    { name: '건강식품', icon: 'healthFoodIcon' },
    { name: '선물세트', icon: 'giftSetIcon' },
  ],
  소품: [
    { name: '인형', icon: 'dollIcon' },
    { name: '디퓨저', icon: 'diffuserIcon' },
  ],
};

// 추천 상품 데이터 ("이 상품, 토리님도 좋아할 거예요")
export const recommendedProducts = [
  {
    id: 1,
    brand: '러브기프트',
    name: '커플 맞춤 캔들 세트',
    price: 24500,
    imageUrl: Candle,
    isBookmarked: true,
  },
  {
    id: 2,
    brand: '헤키모먼트',
    name: '감성 꽃다발 + 미니 카드 패키지',
    price: 19900,
    imageUrl: Flower,
    isBookmarked: false,
  },
  {
    id: 3,
    brand: '스위트쉐크',
    name: '프리미엄 초콜릿 기프트 박스',
    price: 32000,
    imageUrl: Chocolate,
    isBookmarked: false,
  },
];

// 가격대별 인기 상품 데이터
export const rankedProducts = [
  {
    id: 10,
    brand: '플라워데이',
    name: '미니 드라이 플라워 부케',
    price: 12900,
    imageUrl: Bouquet,
  },
  {
    id: 11,
    brand: '스위트오먼트',
    name: '수제 초콜릿 6구 세트',
    price: 11500,
    imageUrl: Choco,
  },
  {
    id: 12,
    brand: '스위트오먼트',
    name: '향기 테라피 미니 캔들',
    price: 13800,
    imageUrl: Scent,
  },
  {
    id: 13,
    brand: '소색플러스',
    name: '수제 쿠키 선물 박스',
    price: 11800,
    imageUrl: Cookie,
  },
  {
    id: 14,
    brand: '베어스테이',
    name: '미니 곰돌이 인형 (기념일 포장 포함)',
    price: 10500,
    imageUrl: Bear,
  },
  {
    id: 15,
    brand: '아로마스토리',
    name: '미니 디퓨저 (자체제작향)',
    price: 13200,
    imageUrl: Diffuser,
  },
  {
    id: 16,
    brand: '우드라이트',
    name: 'LED 우드 무드등',
    price: 14500,
    imageUrl: MoodLight,
  },
  {
    id: 17,
    brand: '티하우스',
    name: '프리미엄 티백 세트',
    price: 12000,
    imageUrl: Tea,
  },
  {
    id: 18,
    brand: '해치오먼트',
    name: '캘리그라피 메시지 카드',
    price: 9900,
    imageUrl: Card,
  },
];
