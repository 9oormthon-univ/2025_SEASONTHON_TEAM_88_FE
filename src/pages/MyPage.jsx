import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';
const MyPage = () => {
  const pageHeader = (
    <Header
      className="text-white bg-black"
      left={<h1 className="text-xl font-bold">마이페이지</h1>}
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
    <MainLayout header={pageHeader} showBottomNav={true}>
      <div className="p-4">
        <p>내 정보(마이 페이지)를 표시하는 페이지입니다.</p>
      </div>
    </MainLayout>
  );
};

export default MyPage;
