import React from 'react';

/**
 * 공용 버튼 컴포넌트
 * - variant: 'primary' | 'icon' | 'cta' | 'step'
 * - isActive: 활성/비활성 제어 (cta/step은 isActive=false면 disabled와 동일 동작)
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
  let combinedClasses = `transition-colors duration-200 flex items-center justify-center ${className}`;

  switch (variant) {
    /** =========================
     *  CTA (예: 완료)
     *  - 피그마 스펙: w-full, h-12, rounded-2xl
     * ========================= */
    case 'cta': {
      combinedClasses +=
        ' w-full h-12 rounded-2xl font-pretendard text-[16px] font-semibold leading-[1.4rem] ';
      combinedClasses += isActive && !disabled
        ? ' bg-[#8371FD] text-white hover:bg-[#6f60f0]'
        : ' bg-[#C9CED3] text-white cursor-not-allowed opacity-70';
      break;
    }

    /** =========================
     *  Step (다음/완료)
     *  - 피그마 스펙: w-full, h-12, rounded-2xl
     *  - 비활성: 연회색
     * ========================= */
    case 'step': {
      combinedClasses +=
        ' w-full h-12 rounded-2xl font-pretendard text-[16px] font-semibold leading-[1.4rem] ';
      if (disabled || !isActive) {
        combinedClasses += ' bg-[#C9CED3] text-white cursor-not-allowed opacity-70';
      } else {
        // isFinal 여부 상관없이 동일 보라색 톤 유지 (호버만)
        combinedClasses += ' bg-[#8371FD] text-white hover:bg-[#6f60f0]';
      }
      break;
    }

    /** =========================
     *  아이콘 버튼 (빠른 액션)
     * ========================= */
    case 'icon': {
      combinedClasses += ' w-full rounded-lg p-4 justify-between font-bold ';
      combinedClasses += disabled
        ? ' bg-[#464B51] text-gray-400 cursor-not-allowed'
        : ' bg-[#8371FD] text-white hover:bg-purple-600';
      break;
    }

    /** =========================
     *  기본 Primary (토글/일반)
     * ========================= */
    case 'primary':
    default: {
      combinedClasses += ' w-full rounded-full py-3 px-4 font-bold ';
      combinedClasses += disabled || !isActive
        ? ' bg-[#464B51] text-white cursor-not-allowed opacity-70'
        : ' bg-[#8371FD] text-white hover:bg-purple-600';
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