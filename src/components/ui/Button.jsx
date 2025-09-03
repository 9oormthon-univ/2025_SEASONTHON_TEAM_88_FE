import React from 'react';

/**
 * 공용 버튼 컴포넌트
 * - variant: 'primary' | 'icon' | 'cta' | 'step'
 * - isActive: 활성/비활성 제어
 * - isFinal: 'step'일 때 마지막 단계(완료) 여부
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  isActive = true,
  isFinal = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  // 공통 베이스
  let combinedClasses =
    `transition-colors duration-200 flex items-center justify-center ${className}`;

  switch (variant) {
    /** =========================
     *  Figma CTA (예: 회원가입 완료 버튼)
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

    /** =========================
     *  Step 버튼 (다음 / 완료)
     * ========================= */
    case 'step': {
      combinedClasses +=
        ' w-full h-12 rounded-xl text-[15px] font-semibold ';
      if (isFinal) {
        combinedClasses += ' bg-[#8371FD] text-white hover:bg-[#6f60f0]';
      } else {
        combinedClasses += isActive
          ? ' bg-[#8371FD] text-white hover:bg-[#6f60f0]'
          : ' bg-gray-300 text-white cursor-not-allowed';
      }
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
      disabled={disabled || (!isActive && (variant === 'cta' || variant === 'step'))}
      className={combinedClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;