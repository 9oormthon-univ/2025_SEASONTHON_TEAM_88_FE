import React from 'react';

/**
 * 화면 상단에 위치하는 헤더 컴포넌트입니다.
 * left, center, right props를 통해 각 영역의 컨텐츠를 커스터마이징할 수 있습니다.
 * @param {object} props
 * @param {React.ReactNode} [props.left] - 헤더의 왼쪽에 표시될 요소입니다. (예: 뒤로가기 버튼)
 * @param {React.ReactNode} [props.center] - 헤더의 중앙에 표시될 요소입니다. (예: 페이지 제목, 로고)
 * @param {React.ReactNode} [props.right] - 헤더의 오른쪽에 표시될 요소입니다. (예: 아이콘 그룹)
 * @param {string} [props.className] - 추가적인 스타일링을 위한 클래스입니다. (예: 'bg-black text-white')
 */
const Header = ({ left, center, right, className = 'text-black bg-white border-b' }) => {
  return (
    <header
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-sm h-14 flex items-center justify-between px-4 z-50 ${className}`}
    >
      {/* 왼쪽 영역: 최소 너비를 지정하여 중앙 정렬에 영향을 주도록 함 */}
      <div className="min-w-[4rem] flex justify-start">{left}</div>

      {/* 중앙 영역: flex-grow를 사용하여 남는 공간을 모두 차지하게 함 */}
      <div className="flex justify-center flex-grow">{center}</div>

      {/* 오른쪽 영역: 최소 너비를 지정하여 중앙 정렬에 영향을 주도록 함 */}
      <div className="min-w-[4rem] flex justify-end">{right}</div>
    </header>
  );
};

export default Header;
