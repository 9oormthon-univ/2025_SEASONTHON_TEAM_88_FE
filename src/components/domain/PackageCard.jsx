import React, { useMemo } from 'react';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

/**
 * @param {'selectable' | 'interactive'} variant
 * @param {{ title:string, emoji:string, compose?:string, items:Array<{id:string,label:string,name:string,price:number,img:string}> }} data
 * @param {boolean} [selected]        // selectable 전용: 카드 선택 여부
 * @param {() => void} [onSelect]     // selectable 전용: 카드 클릭
 * @param {string[]} [selectedItems]  // interactive 전용: 선택된 아이템 id 목록
 * @param {(id:string)=>void} [onItemToggle]
 */
export default function PackageCard({
  variant = 'selectable',
  data,
  selected,
  onSelect,
  selectedItems = [],
  onItemToggle = () => {},
}) {
  const isOpen = variant === 'selectable' && !!selected;

  // 방어
  if (!data || !data.items) return null;

  /** 가격 포맷 보조 (interactive 전용 할인 금액 표시) */
  const DISCOUNT_AMOUNT = 4000;
  const { originalPrice, finalPrice } = useMemo(() => {
    if (variant !== 'interactive') return { originalPrice: 0, finalPrice: 0 };
    const total = data.items.filter((it) => selectedItems.includes(it.id)).reduce((sum, it) => sum + it.price, 0);
    return { originalPrice: total, finalPrice: total > 0 ? total - DISCOUNT_AMOUNT : 0 };
  }, [variant, selectedItems, data.items]);

  const handleCardClick = () => {
    if (variant === 'selectable' && onSelect) onSelect();
  };

  /** 헤더 (라디오 버튼 정렬 규칙 포함) */
  const renderHeader = () => (
    <div className={`flex justify-between ${isOpen ? 'items-start' : 'items-center'}`}>
      {/* 제목 + 서브텍스트 (둘 사이 간격 0.25rem) */}
      <div className="flex flex-col gap-1">
        <h3
          className="max-w-[170px] font-pretendard text-[1.125rem] leading-[1.575rem] truncate"
          style={{
            fontWeight: 600,
            // ✅ selectable일 때만 선택 여부에 따라 색상 토글
            color: variant === 'selectable' && selected ? '#191A1C' : '#646B72',
          }}
        >
          {data.title} <span>{data.emoji}</span>
        </h3>

        {variant === 'selectable' && (
          <p className="font-pretendard text-[0.875rem] leading-[1.4rem] text-[#8B90A0]">구성: {data.compose}</p>
        )}
      </div>

      {/* selectable: 우측 라디오 — 닫힘(미선택) 땐 세로 중앙, 열림(선택) 땐 제목 라인에 정렬 */}
      {variant === 'selectable' ? (
        <div
          aria-hidden
          className={[
            'grid h-5 w-5 place-items-center rounded-full',
            isOpen ? 'self-start mt-1' : 'self-center',
            selected ? 'border-2 border-[#8371FD]' : 'border border-[#B6BBC2]',
          ].join(' ')}
        >
          {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#8371FD]" />}
        </div>
      ) : (
        <span className="rounded-md bg-[#F2F0FF] px-2 py-1 text-[0.625rem] font-normal text-[#6253C1]">
          패키지 {DISCOUNT_AMOUNT.toLocaleString()}원 할인
        </span>
      )}
    </div>
  );

  /** selectable에서 선택됐을 때 노출되는 간단 아이템 리스트 */
  const renderSimpleItemList = () => (
    <div className="flex w-full gap-3 mt-4">
      {data.items.map((it) => (
        <div key={it.id} className="w-[5.25rem]">
          {/* 썸네일 + 카테고리 라벨(오버레이) */}
          <div className="relative w-full h-[90px] rounded-[10px] overflow-hidden bg-gray-200">
            <img src={it.img} alt={it.name} className="object-cover w-full h-full" />
            <span
              className="
                absolute left-2 bottom-2
                flex h-4 items-center justify-center
                rounded-[17px] px-3
                bg-[rgba(0,0,0,0.6)]
                text-white font-pretendard text-[0.625rem] leading-[1rem] font-normal
              "
            >
              {it.label}
            </span>
          </div>

          {/* 상품명 */}
          <div className="mt-2 truncate font-pretendard text-[0.625rem] leading-[1rem] text-[#191A1C]">{it.name}</div>

          {/* 가격 (숫자 + '원' 간격 촘촘) */}
          <div className="mt-0 flex items-end gap-[2px]">
            <span className="font-pretendard text-[1rem] leading-[1.4rem] text-[#191A1C]" style={{ fontWeight: 600 }}>
              {it.price.toLocaleString()}
            </span>
            <span className="font-pretendard text-[0.875rem] leading-[1.4rem] text-[#191A1C]">원</span>
          </div>
        </div>
      ))}
    </div>
  );

  /** interactive 모드용 아이템 리스트 */
  const renderInteractiveItemList = () => (
    <div className="mt-[1.63rem] grid grid-cols-3 gap-[0.62rem]">
      {data.items.map((item) => {
        const checked = selectedItems.includes(item.id);
        return (
          <div key={item.id} className="cursor-pointer" onClick={() => onItemToggle(item.id)}>
            <div className="relative h-[5.625rem] w-[5.25rem]">
              <img src={item.img} alt={item.name} className="h-full w-full rounded-[10px] object-cover" />
              <span className="absolute left-2 bottom-2 flex h-4 items-center justify-center rounded-full bg-black/60 px-2 text-[0.625rem] font-pretendard font-normal text-white">
                {item.label}
              </span>
              <div className="absolute right-1 top-1">
                <Icon name={checked ? 'filled-check' : 'blank-check'} />
              </div>
            </div>

            <p
              className="mt-1 truncate text-[0.625rem] font-pretendard font-normal text-gray-900"
              style={{ lineHeight: '160%' }}
            >
              {item.name}
            </p>

            <p className="text-[1rem] font-pretendard font-semibold text-gray-900">{item.price.toLocaleString()}원</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className="w-full rounded-2xl border border-gray-100 bg-[#F8F8F8] p-[1.25rem] pt-[1.38rem] pb-[1.38rem]"
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (variant === 'selectable' && (e.key === 'Enter' || e.key === ' ')) handleCardClick();
      }}
    >
      {renderHeader()}

      {variant === 'interactive' && (
        <div className="mt-[0.25rem] text-sm">
          <span className="font-pretendard text-[0.75rem] font-normal text-[#464B51]">총 금액: </span>
          <span className="mr-[0.19rem] font-pretendard text-[0.75rem] font-semibold text-[#8371FD]">
            {finalPrice.toLocaleString()}원
          </span>
          <span className="font-pretendard text-[0.625rem] text-gray-400 line-through">
            {originalPrice.toLocaleString()}원
          </span>
        </div>
      )}

      {/* 아이템 목록 */}
      {variant === 'selectable' && isOpen && renderSimpleItemList()}
      {variant === 'interactive' && renderInteractiveItemList()}

      {variant === 'interactive' && (
        <Button
          variant="primary"
          isActive={selectedItems.length > 0}
          onClick={() => console.log('파티 담기')}
          className="mt-[1.63rem] font-pretendard text-[0.875rem] font-medium"
        >
          내 파티에 담기
        </Button>
      )}
    </div>
  );
}
