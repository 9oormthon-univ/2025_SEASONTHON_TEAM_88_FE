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
    <div className="w-full max-w-sm overflow-hidden font-sans bg-white rounded-lg shadow-md">
      {/* 이미지 영역 */}
      <div className="relative">
        <img src={imageUrl} alt={name} className="object-cover w-full h-48" />
        <button
          onClick={handleLikeClick}
          className="absolute top-2 right-2 bg-white/70 rounded-full p-1.5 backdrop-blur-sm transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label="Like button"
        >
          <Icon
            name={isLiked ? 'heart-filled' : 'heart-outline'}
            size={1.5} // 24px
            color={isLiked ? 'text-red-500' : 'text-gray-700'}
          />
        </button>
      </div>

      {/* 정보 영역 */}
      <div className="p-4">
        <p className="text-xs text-gray-500">{brand}</p>
        <h3 className="mt-1 text-base font-semibold text-gray-800 truncate">{name}</h3>
        <p className="mt-1 text-lg font-bold text-gray-900">{price.toLocaleString()}원</p>

        {/* 태그 (선택적 렌더링) */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 메타 정보 (선택적 렌더링) */}
        <div className="flex items-center mt-3 space-x-3 text-sm text-gray-600">
          {rating && reviewCount && (
            <span className="flex items-center">
              {/* 별 아이콘이 필요하다면 Icon 컴포넌트에 추가하세요 */}
              <span className="mr-1 text-yellow-500">★</span>
              {rating} ({reviewCount})
            </span>
          )}
          {likeCount && (
            <span className="flex items-center">
              <Icon name="heart-filled" size={1} color="text-gray-400" className="mr-1" />
              {likeCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
