import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
const AroundPage = () => {
  const pageHeader = <Header className="text-white bg-black" left={<h1 className="text-xl font-bold">내 주변</h1>} />;

  return (
    <MainLayout header={pageHeader} showBottomNav={true}>
      <div className="p-4">
        <p>AroundPage.</p>
      </div>
    </MainLayout>
  );
};

export default AroundPage;
