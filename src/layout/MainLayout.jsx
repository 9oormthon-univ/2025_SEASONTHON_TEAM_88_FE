import React from 'react';
import BottomNav from './BottomNav';

/**
 * 앱의 전체적인 구조를 담당하는 메인 레이아웃 컴포넌트입니다.
 * 페이지로부터 헤더 컴포넌트를 직접 받아 렌더링하여 유연성을 높였습니다.
 * @param {object} props
 * @param {React.ReactNode} props.children - 이 레이아웃 안에 표시될 페이지 컨텐츠입니다.
 * @param {React.ReactNode} props.header - 페이지 상단에 표시될 헤더 컴포넌트입니다.
 * @param {boolean} [props.showBottomNav=true] - 하단 네비게이션을 표시할지 여부입니다.
 */
const MainLayout = ({ children, header, showBottomNav = true }) => {
  return (
    // 기본 배경색을 검은색으로 설정합니다.
    <div className="relative w-full max-w-screen-sm min-h-screen mx-auto scrollbar-hide">
      {/* 페이지로부터 전달받은 헤더를 렌더링합니다. */}
      {header}

      <main className={`pt-[3.355rem]  ${showBottomNav ? 'pb-16' : ''}`}>{children}</main>

      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default MainLayout;
