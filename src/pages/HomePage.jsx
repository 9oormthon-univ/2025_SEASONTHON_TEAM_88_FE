import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';
import Input from '../components/ui/Input';
import { useState } from 'react';
/**
 * 애플리케이션의 메인 페이지 (홈)
 * 로고와 아이콘으로 구성된 헤더를 사용합니다.
 */
const HomePage = () => {
  // 홈 페이지에서 사용할 헤더를 정의합니다.
  const [searchTerm, setSearchTerm] = useState('');
  const homeHeader = (
    <Header
      className="text-white bg-black" // 다크 모드 스타일
      // 왼쪽 영역: 로고 또는 아이콘을 표시합니다.
      // MainIcon 대신 텍스트 로고를 사용했습니다. SVG 컴포넌트로 교체할 수 있습니다.
      left={
        <div className="text-2xl font-bold text-purple-500">
          <Icon name="main-icon" size={6.5625} />
        </div>
      }
      // 오른쪽 영역: 알림 및 장바구니 아이콘을 표시합니다.
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
    <MainLayout header={homeHeader} showBottomNav={true}>
      <div className="p-4 text-white bg-black">
        <Input
          variant="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="원하는 상품을 검색해보세요."
          onSearch={() => alert(`검색어: ${searchTerm}`)}
        ></Input>
        <h1 className="text-2xl font-bold ">메인 </h1>
        <p>상품 목록, 이벤트 배너 등이 여기에 표시됩니다.</p>
      </div>
    </MainLayout>
  );
};

export default HomePage;
