import React, { useState } from 'react';
import Icon from '../ui/Icon';

/**
 * 재사용 가능한 상품 카드 컴포넌트
 * @param {object} props
 * @param {string} props.imageUrl - 로컬에서 import한 이미지 경로
 * @param {string} props.brand - 브랜드명
 * @param {string} props.name - 상품명
 * @param {number} props.price - 가격
 * @param {boolean} [props.initialLiked=false] - 초기 '좋아요' 상태
 * @param {string[]} [props.tags] - '쿠폰즉시적용' 등 태그 배열
 * @param {number} [props.rating] - 별점
 * @param {number} [props.reviewCount] - 리뷰 수
 * @param {number} [props.likeCount] - 좋아요 수
 */
const ProductCard = ({ imageUrl, brand, name, price, initialLiked = false, tags, rating, reviewCount, likeCount }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    console.log(`상품 "${name}" 좋아요 상태: ${!isLiked}`);
  };
  return (
    <div>
      <div className="relative">
        <img src={imageUrl} alt={name} />
        <button
          onClick={handleLikeClick}
          className="absolute top-1 right-1 p-1.5 transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label="Like button"
        >
          <Icon name={isLiked ? 'heart-filled' : 'heart-outline-white'} size={1.25} />
        </button>
      </div>

      <div className="pt-1">
        <p className="font-sans text-xs font-medium text-gray-500 break-keep">{brand}</p>
        <h3 className="mt-0.5 text-sm font-normal text-gray-800  break-keep font-sans line-clamp-2 ">{name}</h3>
        <p className="mt-1 font-sans text-base font-semibold text-gray-900">{price.toLocaleString()}원</p>

        {/* 태그 (선택적 렌더링) */}
        {/* {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5"> 
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}

        {/* 메타 정보 (선택적 렌더링) - 폰트 크기 및 여백 축소 */}
        {/* <div className="flex items-center mt-2 space-x-2 text-xs text-gray-600">
          {rating && reviewCount && (
            <span className="flex items-center">
              <span className="text-yellow-500 mr-0.5">★</span>
              {rating} ({reviewCount})
            </span>
          )}
          {likeCount && (
            <span className="flex items-center">
              <Icon name="heart-filled" size={0.8} color="text-gray-400" className="mr-0.5" />
              {likeCount}
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
