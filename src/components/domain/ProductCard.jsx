import React from 'react';
import Icon from '../ui/Icon';

/**
 * 상품 목록에 사용될 개별 상품 카드 컴포넌트입니다.
 * @param {object} props
 * @param {string} props.imageUrl - 상품 이미지 URL
 * @param {string} props.brand - 브랜드명
 * @param {string} props.name - 상품명
 * @param {number} props.discountRate - 할인율 (예: 30)
 * @param {number} props.price - 할인가
 * @param {number} [props.originalPrice] - 원래 가격 (할인율이 있을 경우 표시)
 * @param {number} props.rating - 별점 (예: 4.5)
 * @param {number} props.reviewCount - 리뷰 수 (예: 82)
 * @param {boolean} [props.isBookmarked=false] - 찜(북마크) 여부
 */
const ProductCard = ({
  imageUrl,
  brand,
  name,
  discountRate,
  price,
  originalPrice,
  rating,
  reviewCount,
  isBookmarked = false,
}) => {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
        <img src={imageUrl} alt={name} className="object-cover w-full h-full" />
        <button className="absolute top-2 right-2" aria-label="찜하기">
          <Icon name={isBookmarked ? 'heart-filled' : 'heart-outline'} size={1.5} color="white" />
        </button>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500">{brand}</p>
        <p className="text-sm font-semibold truncate">{name}</p>
        <div className="flex items-center mt-1">
          {discountRate > 0 && <span className="mr-2 font-bold text-red-500">{discountRate}%</span>}
          <span className="text-base font-bold">{price}원</span>
        </div>
        {originalPrice && <p className="text-xs text-gray-400 line-through">{originalPrice}원</p>}
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <Icon name="star" size={1.5} color="gold" />
          <span className="ml-1">{rating}</span>
          <span className="ml-2">리뷰 {reviewCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
