import api from '../hooks/api';

export const buildPartyRequestBody = ({ purpose, budget, who, specialMode, specialText, items }) => {
  // --- 기존 Map 객체들 (변경 없음) ---
  const partyPurposeMap = {
    생일: 'BIRTHDAY',
    기념일: 'ANNIVERSARY',
    프로포즈: 'PROPOSAL',
    홈파티: 'PARTY',
    '졸업/입학': 'GRADUATION',
    브라이덜샤워: 'BRIDAL_SHOWER',
    젠더리빌: 'GENDER_REVEAL',
  };

  const budgetMap = {
    '1만원미만': 'UNDER_10000',
    '1~2만원대': 'FROM_10000_TO_20000',
    '3~4만원대': 'FROM_30000_TO_40000',
    '5~6만원대': 'FROM_50000_TO_60000',
    '7~8만원대': 'FROM_70000_TO_80000',
    '9~10만원대': 'FROM_90000_TO_100000',
    '10만원 이상': 'OVER_100000',
    기타: 'OTHER',
  };

  const companionMap = {
    '나를 위해': 'FOR_ME',
    연인: 'COUPLE',
    가족: 'FAMILY',
    친구: 'FRIENDS',
    '동료/지인': 'COLLEAGUES',
  };

  // --- ✨ 위시리스트 아이템 Map 추가 ---
  const wishListItemMap = {
    // 식품
    케이크: 'CAKE',
    쿠키: 'COOKIE',
    음료: 'DRINK',
    베이커리: 'BAKERY',
    떡: 'RICE_CAKE',
    전통과자: 'TRADITIONAL_SNACK',
    초콜릿: 'CHOCOLATE',
    사탕: 'CANDY',
    건강식품: 'HEALTHY_FOOD',
    선물세트: 'PRESENT_SET',

    // 소품
    풍선: 'BALLOON',
    가랜드: 'GARLAND',
    배너: 'BANNER',
    테이블장식: 'TABLE_DECOR',
    식기: 'TABLEWARE',
    '꽃/식물': 'FLOWER_PLANT',
    초: 'CANDLE',

    // 주얼리
    반지: 'RING',
    팔찌: 'BRACELET',
    귀걸이: 'EARRINGS',
    목걸이: 'NECKLACE',
    발찌: 'ANKLET',

    // 문구
    '카드/편지지': 'CARD_LETTER',
    선물포장: 'GIFT_WRAP',
    폰케이스: 'PHONE_CASE',
    그립톡: 'GRIPTOK',
    스티커: 'STICKER',
  };

  const partyPurpose = partyPurposeMap[purpose] || 'OTHER';
  const budgetRange = budgetMap[budget] || 'OTHER';
  const companionType = companionMap[who] || 'OTHER';
  const preparationContent = specialMode === '직접입력' ? specialText : '';
  const wishListItems = items.map((item) => wishListItemMap[item]).filter(Boolean);

  return { partyPurpose, budgetRange, companionType, preparationContent, wishListItems };
};

export const submitSurvey = async (surveyData) => {
  const body = buildPartyRequestBody(surveyData);
  const response = await api.post('/parties/survey', body);
  return response;
};
