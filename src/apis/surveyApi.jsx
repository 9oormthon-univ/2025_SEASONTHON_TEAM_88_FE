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
    전통간식: 'TRADITIONAL_SNACK', // '전통과자' -> '전통간식'
    초콜릿: 'CHOCOLATE',
    사탕: 'CANDY',
    건강식품: 'HEALTHY_FOOD',
    // '선물세트'는 현재 UI에 없어 제외
    // 소품
    풍선: 'BALLOON',
    가랜드: 'GARLAND',
    캔들: 'CANDLE', // '초' -> '캔들'
    현수막: 'BANNER',
    '꽃/화분': 'FLOWER_PLANT', // '꽃/식물' -> '꽃/화분'
    테이블웨어: 'TABLEWARE',
    // '테이블장식'은 현재 UI에 없어 제외
    // '조명', '장식', '키트'는 백엔드 Enum에 없어 제외

    // 주얼리
    반지: 'RING',
    팔찌: 'BRACELET',
    귀걸이: 'EARRINGS',
    목걸이: 'NECKLACE',
    발찌: 'ANKLET',
    // '헤어 악세사리', '커플세트', '시계'는 백엔드 Enum에 없어 제외

    // 문구
    카드: 'CARD_LETTER', // '카드/편지지' -> '카드', '편지지'로 분리
    포장: 'GIFT_WRAP',
    '휴대폰 케이스': 'PHONE_CASE', // '폰케이스' -> '휴대폰 케이스'
    그립톡: 'GRIPTOK',
    스티커: 'STICKER',
    // '키링'은 백엔드 Enum에 없어 제외
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

// ✨ 최종 패키지를 생성(저장)하는 API 함수 추가
export const createPartyPackage = async (packageData) => {
  const body = {
    packageName: packageData.packageName,
    wishListItems: packageData.productIds, // API 명세에 따라 wishListItems 키 사용
  };
  const response = await api.post('/parties', body);
  return response;
};
