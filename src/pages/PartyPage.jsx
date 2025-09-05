import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';

import PartyRecommend from './Party/PartyRecommend';

const PartyPage = () => {
  const subHeader = (
    <Header
      className="text-white bg-[#181A1C]"
      left={<h1 className="font-pretendard font-semibold text-[1.25rem] text-[#8371FD]">내 파티</h1>}
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
    <MainLayout header={subHeader} showBottomNav={true}>
      <PartyRecommend />
    </MainLayout>
  );
};

export default PartyPage;
