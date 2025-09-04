import React from 'react';
import bannerImage from '../../assets/images/special_banner.svg';
import Icon from '../ui/Icon';
const SpecialOfferBanner = () => {
  return (
    <section className="p-4 bg-white">
      <h2 className="mb-[0.88rem] text-[1.125rem] leading-[1.575rem] font-pretendard font-semibold">
        특별한 날엔, 특별한 상품
      </h2>
      <div className="relative w-full overflow-hidden rounded-2xl">
        <img src={bannerImage} alt="특별 상품 배너" className="mb-[1.75rem] object-cover w-full h-full" />
        {/* 오버레이 텍스트 및 버튼 */}
        <div className="absolute flex items-center gap-1 text-white bottom-13 right-6">
          <button className="text-[0.625rem] font-semibold bg-[#464B51]/40 px-3 py-1.5 rounded-full font-pretendard flex items-center gap-1">
            상품 보러가기 <Icon size={0.6} name="arrow-right" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;
