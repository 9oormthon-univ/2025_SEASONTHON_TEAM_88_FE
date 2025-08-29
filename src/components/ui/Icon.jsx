import React from 'react';

// SVG 파일을 Vite의 내장 '?react' 접미사를 사용해 React 컴포넌트로 가져옵니다.
// 이 방식을 사용하면 vite-plugin-svgr 없이도 SVG를 컴포넌트처럼 사용할 수 있습니다.
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg?react';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg?react';
import { ReactComponent as HeartFilledIcon } from '../../assets/icons/heart-filled.svg?react';
import { ReactComponent as HeartOutlineIcon } from '../../assets/icons/heart-outline.svg?react';
import { ReactComponent as BellIcon } from '../../assets/icons/bell.svg?react';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left.svg?react';
import { ReactComponent as MainIcon } from '../../assets/icons/main-icon.svg?react';
/**
 * SVG 아이콘을 일관된 방식으로 보여주기 위한 컴포넌트입니다.
 * 이름을 props로 받아 해당하는 아이콘을 렌더링합니다.
 * @param {object} props
 * @param {'search' | 'cart' | 'heart-filled' | 'heart-outline' | 'bell' | 'arrow-left'} props.name - 표시할 아이콘의 이름입니다.
 * @param {number} [props.size=1.5] - 아이콘의 가로/세로 크기입니다. (rem 단위, 기본값 1.5rem = 24px)
 * @param {string} [props.color] - 아이콘의 색상입니다. (tailwind 클래스, 예: 'text-purple-600')
 * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스를 적용할 때 사용합니다.
 */
const Icon = ({ name, size = 1.5, color, className }) => {
  // 아이콘 이름에 따라 해당하는 SVG 컴포넌트를 매핑합니다.
  const iconMap = {
    search: SearchIcon,
    cart: CartIcon,
    'heart-filled': HeartFilledIcon,
    'heart-outline': HeartOutlineIcon,
    bell: BellIcon,
    'arrow-left': ArrowLeftIcon,
    'main-icon': MainIcon,
  };

  const IconComponent = iconMap[name];

  // 해당하는 아이콘이 없으면 아무것도 렌더링하지 않습니다.
  if (!IconComponent) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }

  // fill='currentColor' 속성을 주어 부모의 text color를 상속받게 합니다.
  // width와 height에 템플릿 리터럴을 사용해 'rem' 단위를 붙여줍니다.
  return <IconComponent width={`${size}rem`} height={`${size}rem`} className={`${color} ${className}`} />;
};

export default Icon;
