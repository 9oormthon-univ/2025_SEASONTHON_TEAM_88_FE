import React, { useMemo, useState } from "react";
import PartyCard from "./PartyCard";
import giftbox from "../../assets/icons/giftbox.svg";
import chevron from "../../assets/icons/chevron-left.svg";

export default function PartyCardClose({
  title,
  tasks = [],
  progress = 0.223,
  defaultOpen = false,
  onAdd,
  onDelete,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const BAR_TOTAL_REM = 17.625; // 282px
  const filledRem = useMemo(
    () => Math.max(0, Math.min(1, progress)) * BAR_TOTAL_REM,
    [progress]
  );

  // 화살표 원 (요구 스펙)
  const arrowWrapCls = [
    "flex justify-center items-center shrink-0",
    "w-6 h-6 rounded-full bg-[#EFEFEF]",
    "pt-[0.3125rem] pr-[0.3125rem] pb-1 pl-1",
  ].join(" ");

  if (!open) {
    // 닫힘 상태
    return (
      <section className="w-[20.5rem] rounded-[1.125rem] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)] bg-white">
        {/* 상단(화이트) */}
        <div className="w-[20.5rem] h-[3.6875rem] bg-white flex items-center justify-between px-4">
          <h3 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
            {title}
          </h3>

          {/* 펼치기 버튼: 아래쪽 화살표(rotate-90) */}
          <button
            type="button"
            aria-label="펼치기"
            onClick={() => setOpen(true)}
            className={arrowWrapCls}
          >
            <img
              src={chevron}
              alt=""
              className="w-[0.9375rem] h-[0.9375rem] rotate-90"
            />
          </button>
        </div>
        {/* 하단(프로그레스바) — 보라색 영역 높이 축소 */}
<div className="w-[20.5rem] h-[4rem] bg-[#F2F0FF] px-4 py-1.5">
  <div className="flex items-center justify-between">
    <span className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#8371FD]">
      준비 시작
    </span>
    <span className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#464B51]">
      준비 완료!
    </span>
  </div>

  <div className="relative mt-1.5">
    <div className="w-[17.625rem] h-[0.625rem] rounded-[1.0625rem] bg-[#EBEBEB]" />
    <div
      className="absolute left-0 top-0 h-[0.625rem] rounded-[1.0625rem] bg-[#8371FD] transition-[width] duration-300"
      style={{ width: `${filledRem}rem` }}
    />
    <img
      src={giftbox}
      alt="gift"
      className="absolute -top-[1rem] w-[2.46569rem] h-[2.52625rem] select-none pointer-events-none drop-shadow"
      style={{ left: `calc(${filledRem}rem - 1.2328rem)` }}
    />
  </div>
</div>
      </section>
    );
  }


  return (
    <section className="relative w-[20.5rem]">
      <PartyCard
        title={title}
        tasks={tasks}
        progress={progress}
        onAdd={onAdd}
        onDelete={onDelete}
      />

      {/* 접기 버튼: 위쪽 화살표(-rotate-90) */}
      <button
        type="button"
        aria-label="접기"
        onClick={() => setOpen(false)}
        className={`${arrowWrapCls} absolute right-4 top-4`}
      >
        <img
          src={chevron}
          alt=""
          className="w-[0.9375rem] h-[0.9375rem] -rotate-90"
        />
      </button>
    </section>
  );
}