import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';

/**
 * 텍스트 제목을 가진 서브 페이지의 예시입니다.
 */
const PartyPage = () => {
  // 서브 페이지에서 사용할 헤더를 정의합니다.
  const subHeader = (
    <Header
      className="text-white bg-black" // 다크 모드 스타일
      // 왼쪽 영역: 페이지의 제목을 텍스트로 표시합니다.
      left={<h1 className="text-xl font-bold">내 파티</h1>}
      // 오른쪽 영역: 홈과 동일하게 아이콘들을 표시합니다.
      right={
        <div className="flex items-center space-x-4">
          <button aria-label="알림">
            <Icon name="bell" size={1.5} />
          </button>
          <button aria-label="장바구니">
            <Icon name="cart" size={1.5} />
          </button>
        </div>
      }
    />
  );

  return (
    // MainLayout에 직접 만든 헤더를 전달합니다.
    <MainLayout header={subHeader} showBottomNav={true}>
      <div className="p-4">
        <h2 className="text-xl">내 파티 페이지 컨텐츠</h2>
        <p>이 페이지는 텍스트 제목을 가진 헤더를 사용합니다.</p>
      </div>
    </MainLayout>
  );
};

export default PartyPage;
