import React from 'react';
// 일단 피그마에 적어놓은 버튼1 버튼2 병합 했는데 공용 컴포넌트에서 관리하면 좋을 것 같습니다.
// 여기서 수정하시면 될 거 같아요
/**
 * 프로젝트의 모든 버튼 스타일을 관리하는 통합 버튼 컴포넌트입니다.
 * @param {object} props
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 내용 (텍스트, 아이콘 등)
 * @param {function} props.onClick - 버튼 클릭 시 실행될 함수
 * @param {'primary' | 'icon'} [props.variant='primary'] - 버튼의 주된 스타일 종류를 결정합니다.
 * @param {boolean} [props.isActive=true] - 'primary' variant의 활성/비활성 상태를 제어합니다. (true: 보라색, false: 회색)
 * @param {boolean} [props.disabled=false] - 버튼의 비활성화 여부를 결정합니다. (주로 'icon' variant에서 색상 변경에 사용)
 * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스를 적용합니다.
 */

const Button = ({ children, onClick, variant = 'primary', isActive = true, disabled = false, className = '' }) => {
  let combinedClasses = `w-full font-bold transition-colors duration-200 flex items-center justify-center ${className}`;

  // 1. variant에 따라 스타일 분기
  switch (variant) {
    // 'icon' variant (예: 내 파티 시작하기, 찜 내 파티 추가하기)
    case 'icon':
      combinedClasses += ' rounded-lg p-4 justify-between';
      // disabled 상태에 따라 배경색 변경
      combinedClasses += disabled
        ? ' bg-[#464B51] text-gray-400 cursor-not-allowed'
        : ' bg-[#8371FD] text-white hover:bg-purple-600';
      break;

    // 'primary' variant (예: 내 파티에 담기)
    case 'primary':
    default:
      combinedClasses += ' rounded-full py-3 px-4';
      // isActive 상태에 따라 배경색 변경
      combinedClasses += isActive
        ? ' bg-[#8371FD] text-white hover:bg-purple-600'
        : ' bg-[#464B51] text-white hover:bg-gray-600';
      break;
  }

  return (
    <button onClick={onClick} className={combinedClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
