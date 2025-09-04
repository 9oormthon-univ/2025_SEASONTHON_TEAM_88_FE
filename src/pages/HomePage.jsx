import React from 'react';
import MainLayout from '../layout/MainLayout';
import Header from '../layout/Header';
import Icon from '../components/ui/Icon';
import Input from '../components/ui/Input';
import { useState } from 'react';
import Adver1 from '../assets/images/adver1.svg';
import ProductCard from '../components/domain/ProductCard';
import { recommendedProducts } from '../mocks/products';
import CategoryMenu from '../components/domain/CategoryMenu';
import RecommendedProducts from '../components/domain/RecommendedProducts';
import RankedProducts from '../components/domain/RankedProducts';
import SpecialOfferBanner from '../components/domain/SpecialOfferBanner';

const HomePage = () => {
  const currentPage = 1;
  const totalPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const homeHeader = (
    <Header
      className="text-white bg-black" // 다크 모드 스타일
      left={
        <div className="text-2xl font-bold text-purple-500">
          <Icon name="main-icon" size={6.5625} className="h-[1.875rem]" />
        </div>
      }
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
      <div className="pb-4 pl-4 pr-4 text-white bg-black ">
        <Input
          variant="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="원하는 상품을 검색해보세요."
          onSearch={() => alert(`검색어: ${searchTerm}`)}
        ></Input>

        {/* 배너 이미지와 오버레이 텍스트를 위한 컨테이너 */}
        <div className="relative mt-4">
          {/* 배경 이미지 */}
          <img src={Adver1} alt="첫 구매 고객 혜택 배너" className="w-full" />

          {/* '추천 상품 보기' 버튼 (좌측 하단) */}
          <button
            className="absolute inline-flex items-center h-5 px-3 mr-1 font-pretendard rounded-full text-[0.625rem] text-white/40 bg-black/40 bottom-3 left-6"
            aria-label="추천 상품 보기"
          >
            추천 상품 보기 <Icon name="arrow-right" color="text-white/40" size={0.6} />
          </button>

          {/* 페이지 표시 (우측 하단) */}
          <div className="absolute bottom-3 right-4">
            <div className="inline-flex items-center justify-center h-5 px-2 text-[0.625rem] rounded-full bg-black/40">
              <span className={currentPage === 1 ? 'text-white' : 'text-white/40'}> {currentPage} </span>
              <span className="ml-1 text-white/40"> | {totalPage}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <CategoryMenu />
        <RecommendedProducts />
        <RankedProducts />
        <SpecialOfferBanner />
      </div>
    </MainLayout>
  );
};

export default HomePage;
