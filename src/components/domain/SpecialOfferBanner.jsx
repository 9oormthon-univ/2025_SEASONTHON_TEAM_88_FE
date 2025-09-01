import React from 'react';
import bannerImage from '../../assets/images/special_banner.svg'; // 배너 이미지 import

const SpecialOfferBanner = () => {
  return (
    <section className="p-4 mt-2 bg-white">
      <h2 className="mb-3 text-lg font-bold">특별한 날엔, 특별한 상품</h2>
      <div className="relative w-full h-48 overflow-hidden rounded-2xl">
        {/* 배경 이미지 */}
        <img src={bannerImage} alt="특별 상품 배너" className="object-cover w-full h-full" />
        {/* 오버레이 텍스트 및 버튼 */}
        <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full p-4 text-white bg-black/20">
          <div>
            <span className="px-2 py-1 text-xs rounded-full bg-black/30">쥬얼리</span>
            <p className="mt-2 text-xl font-semibold">
              오늘을 반짝이게 하는
              <br />
              작은 디테일
            </p>
          </div>
          <button className="self-end text-xs bg-black/40 px-3 py-1.5 rounded-full">실시간 인기템 &gt;</button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;
