import React, { useMemo } from 'react';

// --- Helper Sub-components ---
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.75 3.75L4.5 9L2.25 6.75"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * @param {object} props
 * @param {'selectable' | 'interactive'} props.variant - 컴포넌트 종류
 * @param {object} props.data - 패키지 데이터
 * @param {boolean} [props.selected] - (selectable variant) 카드 전체 선택 여부
 * @param {function} [props.onSelect] - (selectable variant) 카드 선택 핸들러
 * @param {string[]} [props.selectedItems] - (interactive variant) 선택된 아이템 ID 배열
 * @param {function(string): void} [props.onItemToggle] - (interactive variant) 아이템 선택/해제 핸들러
 */
export default function PackageCard({
  variant = 'selectable', // 기본값을 'selectable'로 설정
  data,
  selected,
  onSelect,
  selectedItems = [],
  onItemToggle = () => {},
}) {
  /**
   * 숫자를 '만', '천' 단위의 한글 문자열로 변환하는 함수
   * @param {number} price - 변환할 숫자 가격
   * @returns {string} - 변환된 문자열 (예: 25000 -> "2만 5천원")
   */
  const formatPriceToKorean = (price) => {
    if (typeof price !== 'number') return '';
    if (price === 0) return '0원';

    const man = Math.floor(price / 10000);
    const cheon = Math.floor((price % 10000) / 1000);

    const parts = [];
    if (man > 0) {
      parts.push(`${man}만`);
    }
    if (cheon > 0) {
      parts.push(`${cheon}천`);
    }

    return parts.join(' ') + '원';
  };

  // 오류 방지: data prop이 없으면 컴포넌트를 렌더링하지 않음
  if (!data || !data.items) {
    return null;
  }

  const DISCOUNT_AMOUNT = 4000;

  // 'interactive' 모드일 때만 가격 계산
  const { originalPrice, finalPrice } = useMemo(() => {
    if (variant !== 'interactive') return { originalPrice: 0, finalPrice: 0 };

    const total = data.items
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);

    return {
      originalPrice: total,
      finalPrice: total > 0 ? total - DISCOUNT_AMOUNT : 0,
    };
  }, [data.items, selectedItems, variant]);

  // --- 카드 전체 클릭 핸들러 ---
  const handleCardClick = () => {
    if (variant === 'selectable' && onSelect) {
      onSelect();
    }
  };

  // --- UI 렌더링 ---
  const renderHeader = () => (
    <div className="flex items-start justify-between">
      <div>
        <h3
          className={`font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] ${
            selected ? 'text-gray-800' : 'text-gray-500'
          }`}
        >
          {data.title} <span>{data.emoji}</span>
        </h3>
        {variant === 'selectable' && (
          <p className="mt-2 font-pretendard text-[0.875rem] leading-[1.4rem] text-[#8B90A0]">구성: {data.compose}</p>
        )}
      </div>
      {variant === 'selectable' && (
        <div
          aria-hidden
          className={`ml-auto grid place-items-center rounded-full w-5 h-5 ${
            selected ? 'border-2 border-[#8371FD]' : 'border border-[#B6BBC2]'
          }`}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#8371FD]" />}
        </div>
      )}
      {variant === 'interactive' && (
        <span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-md">
          패키지 {formatPriceToKorean(DISCOUNT_AMOUNT)} 할인
        </span>
      )}
    </div>
  );

  const renderSimpleItemList = () => (
    <div className="flex w-full gap-3 mt-4">
      {data.items.map((it) => (
        <div key={it.id} className="w-[100px]">
          <img src={it.img} alt={it.name} className="w-full h-[90px] rounded-[10px] object-cover bg-gray-200" />
          <div className="mt-2 text-[#191A1C] font-pretendard text-[0.625rem] leading-[1rem] truncate">{it.name}</div>
          <div className="mt-1 text-sm font-semibold text-gray-800 font-pretendard">
            {formatPriceToKorean(it.price)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderInteractiveItemList = () => (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {data.items.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <div key={item.id} className="cursor-pointer" onClick={() => onItemToggle(item.id)}>
            <div className="relative">
              <img src={item.img} alt={item.name} className="object-cover w-full h-24 rounded-lg" />
              <span className="absolute left-2 bottom-2 h-4 px-2 rounded-full bg-black/50 text-white text-[10px] flex items-center justify-center">
                {item.label}
              </span>
              <div
                className={`absolute top-2 right-2 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                  isSelected ? 'bg-[#6253C1] border-[#6253C1]' : 'bg-white/50 border-white'
                }`}
              >
                {isSelected && <CheckIcon />}
              </div>
            </div>
            <p className="mt-2 text-gray-700 truncate text-[0.625rem]" style={{ lineHeight: '160%' }}>
              {item.name}
            </p>
            <p className="mt-1 text-sm font-bold text-gray-900">{formatPriceToKorean(item.price)}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="w-full p-4 bg-white border border-gray-100 shadow-sm rounded-2xl"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (variant === 'selectable' && (e.key === 'Enter' || e.key === ' ')) handleCardClick();
      }}
    >
      {renderHeader()}

      {variant === 'interactive' && (
        <div className="mt-2 text-sm">
          <span className="text-gray-500">총 금액: </span>
          <span className="font-bold text-[#6253C1]">{finalPrice.toLocaleString()}원</span>
          <span className="ml-2 text-gray-400 line-through">{originalPrice.toLocaleString()}원</span>
        </div>
      )}

      {/* 아이템 목록 렌더링 분기 */}
      {variant === 'selectable' && selected && renderSimpleItemList()}
      {variant === 'interactive' && renderInteractiveItemList()}

      {variant === 'interactive' && (
        <button className="w-full mt-4 text-sm font-bold text-white bg-gray-700 rounded-lg h-11 active:bg-gray-800">
          내 파티에 담기
        </button>
      )}
    </div>
  );
}
