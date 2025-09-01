// src/components/ui/Button.jsx
import React from 'react';

/**
 * 공용 버튼 컴포넌트
 * - variant: 'primary' | 'icon' | 'cta'
 * - isActive: 활성/비활성 제어(특히 'primary'와 'cta'에서 색 전환)
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  isActive = true,
  disabled = false,
  className = '',
  ...rest
}) => {
  // 공통 베이스
  let combinedClasses =
    `transition-colors duration-200 flex items-center justify-center ${className}`;

  switch (variant) {
    /** =========================
     *  Figma CTA (다음 버튼 등)
     *  - w: 20.5rem / py: 0.4375rem / radius: 0.5rem
     *  - 활성: #8371FD, 비활성: #81878B
     *  - 폰트: Pretendard 1rem 600 / 140%
     * ========================= */
    case 'cta': {
      combinedClasses +=
        ' w-[20.5rem] py-[0.4375rem] rounded-[0.5rem] ' +
        ' font-pretendard text-[1rem] font-semibold leading-[1.4rem] ';
      combinedClasses += isActive
        ? ' bg-[#8371FD] text-white hover:bg-[#6f60f0]'
        : ' bg-[#81878B] text-white cursor-not-allowed';
      break;
    }

    // 'icon' (예: 우측 아이콘 있는 빠른 액션)
    case 'icon': {
      combinedClasses += ' w-full rounded-lg p-4 justify-between font-bold ';
      combinedClasses += disabled
        ? ' bg-[#464B51] text-gray-400 cursor-not-allowed'
        : ' bg-[#8371FD] text-white hover:bg-purple-600';
      break;
    }

    // 'primary' (기본 보라/회색 토글)
    case 'primary':
    default: {
      combinedClasses += ' w-full rounded-full py-3 px-4 font-bold ';
      combinedClasses += isActive
        ? ' bg-[#8371FD] text-white hover:bg-purple-600'
        : ' bg-[#464B51] text-white hover:bg-gray-600';
      break;
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || (!isActive && variant === 'cta')}
      className={combinedClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;