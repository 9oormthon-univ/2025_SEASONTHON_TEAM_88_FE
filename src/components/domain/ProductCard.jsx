import React, { useState } from 'react';
import Icon from '../ui/Icon'; // Icon 컴포넌트 경로

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
  // 컴포넌트 내부에서 '좋아요' 상태를 관리합니다.
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    // 실제 애플리케이션에서는 API 호출 등의 로직이 추가될 수 있습니다.
    console.log(`상품 "${name}" 좋아요 상태: ${!isLiked}`);
  };
  return (
    // 전체 카드 컨테이너: 너비를 줄이고 클릭 가능하도록 cursor-pointer 추가
    <a
      href="#"
      className="block overflow-hidden font-sans transition-shadow duration-200 bg-white rounded-lg shadow-sm w-44 hover:shadow-lg group"
    >
      {/* 이미지 영역: aspect-square로 1:1 비율 유지 */}
      <div className="relative aspect-square">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 bg-white/70 rounded-full p-1.5 backdrop-blur-sm transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label="Like button"
        >
          <Icon
            name={isLiked ? 'heart-filled' : 'heart-outline'}
            size={1.25} // 20px, 아이콘 크기 살짝 줄임
            color={isLiked ? 'text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>

      {/* 정보 영역: 패딩과 각 요소의 여백, 폰트 크기 조정 */}
      <div className="p-2">
        <p className="text-[11px] text-gray-500 truncate">{brand}</p>
        {/* 상품명이 2줄을 넘지 않도록 높이와 line-clamp 설정 */}
        <h3 className="mt-0.5 text-sm font-medium text-gray-800 leading-tight h-10 line-clamp-2">{name}</h3>
        <p className="mt-1 text-base font-bold text-gray-900">{price.toLocaleString()}원</p>

        {/* 태그 (선택적 렌더링) */}
        {tags && tags.length > 0 && (
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
        )}

        {/* 메타 정보 (선택적 렌더링) - 폰트 크기 및 여백 축소 */}
        <div className="flex items-center mt-2 space-x-2 text-xs text-gray-600">
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
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
