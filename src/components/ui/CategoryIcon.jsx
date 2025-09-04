import React from 'react';

// Vite/CRA에서 SVG를 React 컴포넌트로 가져옵니다.
import { ReactComponent as BakeryIconSvg } from '../../assets/icons/category/bakeryIcon.svg?react';
import { ReactComponent as CakeIconSvg } from '../../assets/icons/category/cakeIcon.svg?react';
import { ReactComponent as CandyIconSvg } from '../../assets/icons/category/candyIcon.svg?react';
import { ReactComponent as ChocolateIconSvg } from '../../assets/icons/category/chocolateIcon.svg?react';
import { ReactComponent as CookieIconSvg } from '../../assets/icons/category/cookieIcon.svg?react';
import { ReactComponent as DrinkIconSvg } from '../../assets/icons/category/drinkIcon.svg?react';
import { ReactComponent as GiftSetIconSvg } from '../../assets/icons/category/giftSetIcon.svg?react';
import { ReactComponent as HealthFoodIconSvg } from '../../assets/icons/category/healthFoodIcon.svg?react';
import { ReactComponent as RiceCakeIconSvg } from '../../assets/icons/category/riceCakeIcon.svg?react';
import { ReactComponent as TraditionalSnackIconSvg } from '../../assets/icons/category/traditionalSnackIcon.svg?react';
// import { ReactComponent as DollIconSvg } from '../../assets/icons/category/dollIcon.svg?react';
// import { ReactComponent as DiffuserIconSvg } from '../../assets/icons/category/diffuserIcon.svg?react';

/**
 * 아이콘 이름을 받아 해당하는 SVG 컴포넌트를 렌더링합니다.
 * @param {object} props
 * @param {string} props.name - 'cakeIcon', 'cookieIcon' 등 CATEGORIES 데이터에 정의된 아이콘 이름
 * @param {string} [props.className] - 추가적인 스타일링을 위한 Tailwind CSS 클래스
 */
const CategoryIcon = ({ name, className }) => {
  const iconMap = {
    bakeryIcon: BakeryIconSvg,
    cakeIcon: CakeIconSvg,
    candyIcon: CandyIconSvg,
    chocolateIcon: ChocolateIconSvg,
    cookieIcon: CookieIconSvg,
    drinkIcon: DrinkIconSvg,
    giftSetIcon: GiftSetIconSvg,
    healthFoodIcon: HealthFoodIconSvg,
    riceCakeIcon: RiceCakeIconSvg,
    traditionalSnackIcon: TraditionalSnackIconSvg,
    // dollIcon: DollIconSvg,
    // diffuserIcon: DiffuserIconSvg,
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    // 아이콘을 찾지 못했을 경우 렌더링하지 않음
    return null;
  }

  return (
    <div className={`w-13 h-13 mb-1 rounded-2xl flex items-center justify-center ${className}`}>
      <IconComponent className="w-13 h-13" />
    </div>
  );
};

export default CategoryIcon;
