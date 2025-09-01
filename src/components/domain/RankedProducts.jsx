import React from 'react';
import { rankedProducts } from '../../mocks/products'; // 순위 상품 mock 데이터

// 순위 목록에 표시될 간단한 상품 아이템
const RankedItem = ({ rank, product }) => (
  <div className="flex items-center space-x-3">
    <span className="w-4 text-lg font-bold text-center">{rank}</span>
    <img src={product.imageUrl} alt={product.name} className="object-cover w-16 h-16 rounded-md" />
    <div className="flex-1">
      <p className="text-[11px] text-gray-500">{product.brand}</p>
      <p className="text-sm text-gray-800 line-clamp-2">{product.name}</p>
      <p className="text-sm font-bold">{product.price.toLocaleString()}원</p>
    </div>
  </div>
);

const RankedProducts = () => {
  const FILTERS = ['1만원대', '2만원대', '3만원대', '4만원대', '5만원대'];

  return (
    <section className="p-4 mt-2 bg-white">
      <h2 className="mb-3 text-lg font-bold">가격대별 인기 상품 순위</h2>
      {/* 가격 필터 버튼 */}
      <div className="flex pb-2 mb-4 space-x-2 overflow-x-auto">
        {FILTERS.map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap ${
              index === 0 ? 'bg-gray-800 text-white font-bold' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      {/* 상품 순위 (2열 그리드) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {rankedProducts.map((product, index) => (
          <RankedItem key={product.id} rank={index + 1} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RankedProducts;
