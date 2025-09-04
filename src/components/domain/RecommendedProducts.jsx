import React from 'react';
import ProductCard from './ProductCard';
import { recommendedProducts } from '../../mocks/products';

const RecommendedProducts = () => {
  return (
    <section className="p-4 bg-white">
      <h2 className="mb-[0.88rem] text-lg font-semibold font-pretendard">이 상품, 토리님도 좋아할 거예요</h2>
      {/* 가로 스크롤을 위한 컨테이너 */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-26.5">
            <ProductCard imageUrl={product.imageUrl} brand={product.brand} name={product.name} price={product.price} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
