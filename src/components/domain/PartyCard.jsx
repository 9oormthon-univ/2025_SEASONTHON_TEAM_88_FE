// src/components/domain/PartyCard.jsx
import React, { useEffect, useMemo, useState } from 'react';
import giftbox from '../../assets/icons/giftbox.svg';
import { ReactComponent as CheckGray } from '../../assets/icons/check-round(gray).svg?react';
import { ReactComponent as CheckPurple } from '../../assets/icons/check-round.svg?react';
import ConfirmModal from '../ui/ConfirmModal';

export default function PartyCard({ title, tasks = [], onAdd, onDelete, onProgressChange }) {
  const [items, setItems] = useState(tasks);
  const [checked, setChecked] = useState({});
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);

  // 진행률
  const total = items.length;
  const checkedCount = useMemo(() => items.reduce((acc, _, i) => acc + (checked[i] ? 1 : 0), 0), [items, checked]);
  const ratio = total > 0 ? checkedCount / total : 0;
  const done = ratio >= 1;

  /** ── 바/선물 스펙 (Close와 동일) ───────────────────────── */
  const BAR_TOTAL_REM = 18.5;
  const BAR_H_REM = 0.625;
  const BAR_R_REM = 1.0625;

  const GIFT_W_BASE = 2.46569;
  const GIFT_H_BASE = 2.46563;
  const GIFT_SCALE = 1.44;
  const GIFT_W = GIFT_W_BASE * GIFT_SCALE;
  const GIFT_H = GIFT_H_BASE * GIFT_SCALE;

  const clamped = Math.max(0, Math.min(1, ratio));
  const filledRem = clamped * BAR_TOTAL_REM;

  // 🎁 선물박스 위치: 0%=왼쪽, 100%=오른쪽, 그 외=채워진 끝(중앙 기준)
  const giftLeft = useMemo(() => {
    if (clamped === 0) return -GIFT_W / 4; // 시작부 살짝 앞으로
    if (clamped === 1) return BAR_TOTAL_REM - GIFT_W / 2; // 끝에서 중앙 정렬
    return filledRem - GIFT_W / 2; // 진행 끝의 중앙
  }, [clamped, filledRem]);

  const filledWidth = Math.min(filledRem, BAR_TOTAL_REM);

  useEffect(() => {
    onProgressChange?.(ratio);
  }, [ratio, onProgressChange]);

  const toggleCheck = (idx) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const startAdding = () => !adding && setAdding(true);
  const cancelAdding = () => {
    setAdding(false);
    setNewText('');
  };
  const commitAdd = () => {
    const t = newText.trim();
    if (!t) return;
    setItems((prev) => [...prev, t]);
    setNewText('');
    setAdding(false);
    onAdd?.(t);
  };

  const buttonDisabled = adding ? newText.trim().length === 0 : false;

  return (
    <>
      <section className="w-full rounded-[1.25rem] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        {/* 헤더 */}
        <header className="flex items-center justify-between">
          <h3 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">{title}</h3>
        </header>

        {/* 진행 바 */}
        <div className="mt-3">
          {/* 라벨 라인: 왼쪽 '준비 완료'(완료시에만), 오른쪽 '준비 시작/준비 중' */}
          <div className="relative h-4">
            {done ? (
              <span className="absolute left-0 font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#8371FD]">
                준비 완료
              </span>
            ) : (
              // 자리 유지용 투명 텍스트 (레이아웃 안정)
              <span className="absolute left-0 opacity-0 select-none">.</span>
            )}
            <span className="absolute right-0 font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#464B51]">
              {clamped === 0 ? '준비 시작' : done ? '' : '준비 중'}
            </span>
          </div>

          {/* 바 + 선물박스 */}
          <div className="relative mt-1" style={{ width: `${BAR_TOTAL_REM}rem` }}>
            {/* 배경 바 */}
            <div
              className="bg-[#EBEBEB]"
              style={{
                width: `${BAR_TOTAL_REM}rem`,
                height: `${BAR_H_REM}rem`,
                borderRadius: `${BAR_R_REM}rem`,
              }}
            />
            {/* 채워진 바 */}
            <div
              className="absolute left-0 top-0 bg-[#8371FD] transition-[width] duration-300"
              style={{
                width: `${filledWidth}rem`,
                height: `${BAR_H_REM}rem`,
                borderRadius: `${BAR_R_REM}rem`,
              }}
            />
            {/* 선물박스 */}
            <img
              src={giftbox}
              alt="gift"
              className="absolute select-none pointer-events-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)]"
              style={{
                left: `${giftLeft}rem`,
                top: `-${GIFT_H / 2.15}rem`,
                width: `${GIFT_W}rem`,
                height: `${GIFT_H}rem`,
              }}
            />
          </div>
        </div>

        {/* 준비 리스트 + 배지 */}
        <div className="flex items-center justify-between mt-5">
          <h4 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
            준비 리스트
          </h4>
          {done ? (
            <span className="inline-flex w-[3.375rem] h-[1.4375rem] items-center justify-center rounded-[2rem] bg-[#8371FD]">
              <span className="font-pretendard text-[0.75rem] font-medium leading-[1.2rem] text-white">완료</span>
            </span>
          ) : (
            <span className="inline-flex w-[3.375rem] h-[1.4375rem] items-center justify-center rounded-[2rem] bg-[#EFE8FF]">
              <span className="font-pretendard text-[0.75rem] font-medium leading-[1.2rem] text-[#44388C]">진행중</span>
            </span>
          )}
        </div>

        {/* 리스트 */}
        <ul className="mt-3 space-y-2">
          {items.map((text, idx) => {
            const isChecked = !!checked[idx];
            return (
              <li
                key={`${text}-${idx}`}
                className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]"
                onClick={() => toggleCheck(idx)}
              >
                <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#191A1C]">
                  {text}
                </span>
                {isChecked ? (
                  <CheckPurple
                    className="w-[1.25rem] h-[1.25rem] shrink-0"
                    style={{ strokeWidth: 1, stroke: '#8371FD' }}
                  />
                ) : (
                  <CheckGray
                    className="w-[1.25rem] h-[1.25rem] shrink-0"
                    style={{ strokeWidth: 1, stroke: '#464B51' }}
                  />
                )}
              </li>
            );
          })}

          {/* 입력 행 */}
          {adding && (
            <li className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  cancelAdding();
                }}
                className="mr-2 text-[#9AA0A6] text-[1rem] leading-none"
                aria-label="입력 취소"
              >
                ×
              </button>
              <input
                autoFocus
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="편지 작성하기"
                className="flex-1 bg-transparent outline-none text-[#191A1C] placeholder:text-[#9AA0A6] font-pretendard text-[0.875rem]"
                onClick={(e) => e.stopPropagation()}
              />
              <CheckGray
                className="ml-2 w-[1.25rem] h-[1.25rem] shrink-0"
                style={{ strokeWidth: 1.5, stroke: '#464B51' }}
              />
            </li>
          )}
        </ul>

        {/* 리스트 추가 버튼 */}
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={adding ? commitAdd : startAdding}
          aria-disabled={buttonDisabled}
          className={[
            'mt-4 flex w-[18.0625rem] h-[2.375rem] items-center justify-center',
            'rounded-[2rem]',
            'bg-[#81878B] text-white',
            buttonDisabled ? 'cursor-not-allowed opacity-70' : 'active:opacity-90',
          ].join(' ')}
        >
          <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">리스트 추가하기</span>
        </button>

        {/* 파티 삭제 */}
        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#81878B] underline"
          >
            파티 삭제
          </button>
        </div>
      </section>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          onDelete?.();
        }}
        title="파티를 삭제하시겠습니까?"
        description="삭제 후에는 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
