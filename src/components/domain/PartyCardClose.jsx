import React, { useMemo, useState } from 'react';
import PartyCard from './PartyCard';
import giftbox from '../../assets/icons/giftbox.svg';
import chevron from '../../assets/icons/chevron-left.svg';

export default function PartyCardClose({
  title,
  tasks = [],
  progress = 0, // 0 ~ 1
  defaultOpen = false,
  onAdd,
  onDelete,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [ratio, setRatio] = useState(progress);

  /** ---- Bar & Gift spec ---- */
  const BAR_TOTAL_REM = 17.625; // Adjusted to the correct value from the previous component
  const BAR_H_REM = 0.625;
  const BAR_R_REM = 1.0625;

  // 🎁 선물박스: 살짝 키움
  const GIFT_W_BASE = 2.46569; // Reverted to previous correct values
  const GIFT_H_BASE = 2.46563;
  const GIFT_SCALE = 1.44;
  const GIFT_W = GIFT_W_BASE * GIFT_SCALE;
  const GIFT_H = GIFT_H_BASE * GIFT_SCALE;

  const clamped = Math.max(0, Math.min(1, ratio));
  const filledRem = useMemo(() => clamped * BAR_TOTAL_REM, [clamped]);

  const isZero = clamped === 0;
  const isDone = clamped === 1;
  const isDoing = clamped > 0 && clamped < 1;

  // 🎯 선물박스 위치
  const giftLeft = useMemo(() => {
    // For 0% progress ("준비 시작"), the gift box is at the beginning of the bar.
    if (isZero) return -GIFT_W / 4; // Positioned slightly before the bar starts for visual alignment.

    // For 100% progress ("준비 완료"), the gift box is at the very end.
    if (isDone) return BAR_TOTAL_REM - GIFT_W / 2; // Centered on the end of the bar.

    // For any progress in between, the gift box moves with the end of the filled bar.
    // It is centered on the current filledRem position.
    return filledRem - GIFT_W / 2;
  }, [clamped, filledRem, isZero, isDone]);

  // The filled purple bar should have a width equal to the progress.
  const filledBarWidth = filledRem;

  const arrowWrapCls =
    'flex justify-center items-center shrink-0 w-6 h-6 rounded-full bg-[#EFEFEF] pt-[0.3125rem] pr-[0.3125rem] pb-1 pl-1';

  /** ---- Closed (축소) ---- */
  if (!open) {
    return (
      <section className="w-[20.5rem] rounded-[1.125rem] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)] bg-white">
        {/* Header */}
        <div className="w-[20.5rem] h-[3.6875rem] bg-white flex items-center justify-between px-4">
          <h3 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">{title}</h3>
          <button type="button" aria-label="펼치기" onClick={() => setOpen(true)} className={arrowWrapCls}>
            <img src={chevron} alt="" className="w-[0.9375rem] h-[0.9375rem] rotate-270" />
          </button>
        </div>

        {/* Progress */}
        <div className="w-[20.5rem] h-[5.5625rem] bg-[#F2F0FF] px-4 pt-[1.5rem] pb-[0.625rem]">
          {/* 라벨 라인 */}
          <div className="relative h-4">
            {isDone ? (
              <span className="absolute left-0 font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#8371FD]">
                준비 완료
              </span>
            ) : (
              <span className="absolute right-[0.55rem] font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#464B51]">
                {isZero ? '준비 시작' : isDoing ? '준비 중' : ''}
              </span>
            )}
          </div>

          {/* 바 */}
          <div className="relative mt-2">
            {/* 배경 바 (화이트) */}
            <div
              className="w-[18rem]" // Adjusted width back to previous correct value
              style={{
                height: `${BAR_H_REM}rem`,
                borderRadius: `${BAR_R_REM}rem`,
                background: '#ffffff', // Adjusted to correct color
              }}
            />
            {/* 채워진 바 (보라) */}
            <div
              className="absolute left-0 top-0 transition-[width] duration-300"
              style={{
                width: `${filledBarWidth}rem`,
                height: `${BAR_H_REM}rem`,
                borderRadius: `${BAR_R_REM}rem`,
                background: '#8371FD', // Adjusted to correct color
              }}
            />
            {/* 선물박스 */}
            <img
              src={giftbox}
              alt="gift"
              className="absolute select-none pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
              style={{
                left: `${giftLeft}rem`,
                top: `-${GIFT_H / 2.2}rem`,
                width: `${GIFT_W}rem`,
                height: `${GIFT_H}rem`,
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  /** ---- Open (확장) ---- */
  return (
    <section className="relative w-[20.5rem]">
      <PartyCard title={title} tasks={tasks} onAdd={onAdd} onDelete={onDelete} onProgressChange={setRatio} />
      <button
        type="button"
        aria-label="접기"
        onClick={() => setOpen(false)}
        className={`${arrowWrapCls} absolute right-4 top-4`}
      >
        <img src={chevron} alt="" className="w-[0.9375rem] h-[0.9375rem] rotate-90" />
      </button>
    </section>
  );
}
