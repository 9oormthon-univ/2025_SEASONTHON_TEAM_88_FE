import React from 'react';
import ProductCard from './ProductCard';
import { recommendedProducts } from '../../mocks/products';

const RecommendedProducts = () => {
  return (
    <section className="p-4 bg-white">
      <h2 className="mb-3 text-lg font-bold">이 상품, 토리님도 좋아할 거예요</h2>
      {/* 가로 스크롤을 위한 컨테이너 */}
      <div className="flex pb-2 space-x-3 overflow-x-auto">
        {recommendedProducts.map((product) => (
          // flex-shrink-0 클래스로 카드 크기가 줄어들지 않게 방지
          <div key={product.id} className="flex-shrink-0">
            <ProductCard imageUrl={product.imageUrl} brand={product.brand} name={product.name} price={product.price} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
