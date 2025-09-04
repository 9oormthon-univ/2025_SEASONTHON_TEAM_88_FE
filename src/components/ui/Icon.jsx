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
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg?react';
import { ReactComponent as HeartOutLineIconWhite } from '../../assets/icons/heart-outline-white.svg?react';
import { ReactComponent as RankBgIcon } from '../../assets/icons/rankbg.svg?react';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg?react';
import { ReactComponent as DropdownIcon } from '../../assets/icons/dropdown.svg?react';
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
  const iconMap = {
    search: SearchIcon,
    cart: CartIcon,
    'heart-filled': HeartFilledIcon,
    'heart-outline': HeartOutlineIcon,
    bell: BellIcon,
    'arrow-left': ArrowLeftIcon,
    'main-icon': MainIcon,
    'arrow-right': ArrowRightIcon,
    'heart-outline-white': HeartOutLineIconWhite,
    rankbg: RankBgIcon,
    home: HomeIcon,
    dropdown: DropdownIcon,
  };

  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon not found: ${name}`);
    return null;
  }
  // 하트 svg 크기 달라서 조정
  const style = name.startsWith('heart-filled') ? { transform: 'scale(1.3)' } : {};

  return <IconComponent width={`${size}rem`} height={`${size}rem`} style={style} className={`${color} ${className}`} />;
};

export default Icon;
