import React from 'react';
import { rankedProducts } from '../../mocks/products'; // 순위 상품 mock 데이터
import { useState } from 'react';
import { useMemo } from 'react';
import Icon from '../ui/Icon';
// 순위 목록에 표시될 간단한 상품 아이템
const RankedItem = ({ rank, product }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-start space-x-3 w-[17.5rem]">
      {/* 이미지와 순위 오버레이를 위한 컨테이너 */}
      <div className="relative flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover rounded-md w-[5.9375rem] h-[5.9375rem]"
        />

        {/* 순위 오버레이: 아이콘 배경 + 숫자 */}
        <div className="absolute top-0 left-0.5 w-7 h-7">
          <Icon name="rankbg" className="w-full h-full text-gray-800 opacity-70" />
          <span
            className="absolute text-xs font-bold text-white"
            style={{ top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {rank}
          </span>
        </div>

        {/* 하트 아이콘 버튼 오버레이 */}
        <button
          onClick={handleLikeClick}
          className="absolute p-1 transition-transform duration-200 ease-in-out top-1 right-1 hover:scale-110"
          aria-label="Like button"
        >
          <Icon
            name={isLiked ? 'heart-filled' : 'heart-outline-white'}
            size={1}
            className={`${isLiked ? 'text-red-500' : 'text-white'} drop-shadow-lg`}
          />
        </button>
      </div>
      {/* 상품 정보 */}
      <div className="flex-1 min-w-0">
        <p className="text-[0.75rem] leading-[1.2rem] font-medium text-gray-500 font-pretendard break-keep">
          {product.brand}
        </p>
        <p className="text-[0.875rem] leading-[1.4rem] font-normal text-gray-900  break-keep font-pretendard line-clamp-1 ">
          {product.name}
        </p>
        <p className="mt-1 text-[1rem] leading-[1.4rem] font-semibold text-gray-900 font-pretendard">
          {product.price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

const RankedProducts = () => {
  const FILTERS = ['1만원대', '2만원대', '3만원대', '4만원대', '5만원대', '6만원대', '7만원대', '8만원대', '9만원대'];
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);

  // 선택된 필터에 따라 상품 목록을 필터링하고 정렬합니다.
  const filteredProducts = useMemo(() => {
    // '1만원대'에서 숫자 '1'을 추출하고 10000을 곱합니다.
    const minPrice = parseInt(selectedFilter.match(/\d+/)[0], 10) * 10000;
    const maxPrice = minPrice + 10000;

    return rankedProducts
      .filter((product) => product.price >= minPrice && product.price < maxPrice)
      .sort((a, b) => a.price - b.price); // 예시: 가격 오름차순으로 정렬
  }, [selectedFilter]);

  return (
    <section className="p-4 bg-white">
      <h2 className="mb-3 text-lg font-semibold font-pretendard">가격대별 인기 상품 순위</h2>
      {/* 가격 필터 버튼 */}
      <div className="flex pb-2 mb-3 space-x-2 overflow-x-auto scrollbar-hide">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-1.5 text-[0.875rem] rounded-full font-pretendard font-medium whitespace-nowrap border transition-colors duration-200 ${
              selectedFilter === filter
                ? 'border-gray-700 bg-gray-700 text-white '
                : 'border-gray-400 bg-white text-gray-500'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      {/* 상품 순위 (2열 그리드) */}
      <div className="grid grid-flow-col grid-rows-3 overflow-x-auto gap-x-4 font-pretendard gap-y-6 scrollbar-hide">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => <RankedItem key={product.id} rank={index + 1} product={product} />)
        ) : (
          <p className="col-span-2 py-8 text-center text-gray-500">해당 가격대의 상품이 없습니다.</p>
        )}
      </div>
    </section>
  );
};

export default RankedProducts;
