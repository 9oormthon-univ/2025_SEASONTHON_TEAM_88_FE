// import React from 'react';

// /**
//  * 키워드, 필터 항목 등을 표시하는 태그(칩) 컴포넌트입니다.
//  * 클릭을 통해 선택/해제 상태를 변경할 수 있습니다.
//  * @param {object} props
//  * @param {React.ReactNode} props.children - 태그 내부에 표시될 텍스트 또는 내용입니다.
//  * @param {boolean} [props.isActive=false] - 태그의 활성화(선택된) 상태 여부입니다.
//  * @param {function} props.onClick - 태그를 클릭했을 때 실행될 함수입니다.
//  * @param {string} [props.className] - 추가적인 Tailwind CSS 클래스를 적용할 때 사용합니다.
//  */
// const Tag = ({ children, isActive = false, onClick, className = '' }) => {
//   // 기본 스타일: 패딩, 둥근 모서리, 글자 크기 등
//   const baseStyle = 'px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer transition-colors duration-200';

//   // 활성/비활성 상태에 따른 스타일
//   const activeStyle = 'bg-purple-600 text-white';
//   const inactiveStyle = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

//   // props로 받은 isActive 값에 따라 스타일을 조합
//   const combinedClasses = `${baseStyle} ${isActive ? activeStyle : inactiveStyle} ${className}`;

//   return (
//     <button onClick={onClick} className={combinedClasses}>
//       {children}
//     </button>
//   );
// };

// export default Tag;

import React from 'react';

const Tag = () => {
  return <div>Tag</div>;
};

export default Tag;
