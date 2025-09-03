import React from "react";
import MainLayout from "../layout/MainLayout";
import Header from "../layout/Header";
import Icon from "../components/ui/Icon";

import PartyRecommend from "./Party/PartyRecommend";

const PartyPage = () => {
  const subHeader = (
    <Header
      className="text-white bg-black"
      left={<h1 className="text-xl font-bold">내 파티</h1>}
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
      {/* ✅ PartyRecommend 컴포넌트 삽입 */}
      <PartyRecommend />
    </MainLayout>
  );
};

export default PartyPage;
