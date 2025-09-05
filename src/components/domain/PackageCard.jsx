import React from "react";

/**
 * 예산 맞춤 패키지 카드
 * - data: { id, title, emoji, compose, items: [{id,label,name,price,img}] }
 * - selected: boolean (현재 카드가 선택되었는지)
 * - onSelect: () => void (카드 클릭 시 호출)
 */
export default function PackageCard({ data, selected, onSelect }) {
  // 카드: 비선택/선택 모두 같은 배경, 선택 시 라디오/텍스트 컬러만 변경
  const container =
    "relative w-full rounded-[18px] p-[18px] border bg-[#F8F8F8] border-[#F0F0F0]";

  const titleCls =
    "font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] " +
    (selected ? "text-[#191A1C]" : "text-[#646B72]");

  return (
    <div
      className={container}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect?.();
      }}
    >
      {/* 상단: 제목/설명 + 라디오 */}
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-[12rem]">
          <div className={titleCls}>
            {data.title} <span>{data.emoji}</span>
          </div>
          <div className="mt-2 font-pretendard text-[0.875rem] leading-[1.4rem] text-[#8B90A0]">
            구성: {data.compose}
          </div>
        </div>

        {/* 라디오 (비선택: 회색 외곽 / 선택: 보라 외곽 + 내부 점) */}
        <div
          aria-hidden
          className={[
            "ml-auto grid place-items-center rounded-full",
            "w-5 h-5",
            selected ? "border-2 border-[#8371FD]" : "border border-[#B6BBC2]",
          ].join(" ")}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-[#8371FD]" />}
        </div>
      </div>

      {/* 선택 시에만 상세 아이템 노출 */}
      {selected && (
        <div className="mt-4 w-full flex gap-3">
          {data.items.map((it) => (
            <div key={it.id} className="w-[100px]">
              {/* 썸네일 */}
              <div
                className="relative w-full h-[90px] rounded-[10px] overflow-hidden bg-gray-200"
                style={{
                  backgroundImage: `url(${it.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <span
                  className="absolute left-2 bottom-2 h-4 px-3 rounded-[17px] bg-black/60
                             text-white font-pretendard text-[10px] leading-4"
                >
                  {it.label}
                </span>
              </div>

              {/* 상품명 (Caption 04) */}
              <div className="mt-2 text-[#191A1C] font-pretendard text-[0.625rem] leading-[1rem] truncate">
                {it.name}
              </div>

              {/* 가격 – 숫자/원 서로 다른 타이포 */}
              <div className="mt-1 flex items-end gap-1">
                {/* 숫자: 1rem / 600 / 1.4rem */}
                <span className="text-[#191A1C] font-pretendard text-[1rem] font-semibold leading-[1.4rem]">
                  {it.price.toLocaleString()}
                </span>
                {/* '원': 0.875rem / 400 / 1.4rem */}
                <span className="text-[#191A1C] font-pretendard text-[0.875rem] font-normal leading-[1.4rem]">
                  원
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}