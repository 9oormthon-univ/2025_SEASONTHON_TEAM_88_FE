// src/components/domain/PartyCard.jsx
import React, { useEffect, useMemo, useState } from "react";
import giftbox from "../../assets/icons/giftbox.svg";
import { ReactComponent as CheckGray } from "../../assets/icons/check-round(gray).svg?react";
import { ReactComponent as CheckPurple } from "../../assets/icons/check-round.svg?react";

export default function PartyCard({
  title,
  tasks = [],
  onAdd,
  onDelete,
  onProgressChange, // 진행률 변경 콜백
}) {
  const [items, setItems] = useState(tasks);
  const [checked, setChecked] = useState({});
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");

  // 진행률 계산
  const total = items.length;
  const checkedCount = useMemo(
    () => items.reduce((acc, _, i) => acc + (checked[i] ? 1 : 0), 0),
    [items, checked]
  );
  const ratio = total > 0 ? checkedCount / total : 0; // 0~1
  const done = ratio >= 1;

  const BAR_TOTAL_REM = 17.625;
  const filledRem = ratio * BAR_TOTAL_REM;

  // 진행률을 부모(PartyCardClose)로 전달
  useEffect(() => {
    onProgressChange?.(ratio);
  }, [ratio, onProgressChange]);

  const toggleCheck = (idx) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // 리스트 추가 flow
  const startAdding = () => !adding && setAdding(true);
  const cancelAdding = () => {
    setAdding(false);
    setNewText("");
  };
  const commitAdd = () => {
    const t = newText.trim();
    if (!t) return;
    setItems((prev) => [...prev, t]);
    setNewText("");
    setAdding(false);
    onAdd?.(t);
  };

  const buttonDisabled = adding ? newText.trim().length === 0 : false;
  const buttonAction = adding ? commitAdd : startAdding;

  return (
    <section className="w-full rounded-[1.25rem] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      {/* 헤더 */}
      <header className="flex items-center justify-between">
        <h3 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
          {title}
        </h3>
      </header>

      {/* 진행 바 */}
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <span className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#8371FD]">
            준비 시작
          </span>
          <span
            className={`font-pretendard text-[0.625rem] font-semibold leading-[1rem] ${
              done ? "text-[#8371FD]" : "text-[#464B51]"
            }`}
          >
            준비 완료!
          </span>
        </div>
        <div className="relative mt-1 w-[17.625rem] h-[0.625rem] rounded-[1.0625rem] bg-[#EBEBEB]">
          <div
            className="h-[0.625rem] rounded-[1.0625rem] bg-[#8371FD] transition-[width] duration-300"
            style={{ width: `${filledRem}rem` }}
          />
          <img
            src={giftbox}
            alt="gift"
            className="absolute -top-[0.9rem] w-[2.46569rem] h-[2.52625rem] select-none pointer-events-none"
            style={{ left: `calc(${filledRem}rem - 1.2328rem)` }}
          />
        </div>
      </div>

      {/* 준비 리스트 + 배지 */}
      <div className="mt-5 flex items-center justify-between">
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
                <CheckPurple className="w-[0.83331rem] h-[0.83331rem] shrink-0" style={{ strokeWidth: 1, stroke: "#8371FD" }} />
              ) : (
                <CheckGray className="w-[0.83331rem] h-[0.83331rem] shrink-0" style={{ strokeWidth: 1, stroke: "#464B51" }} />
              )}
            </li>
          );
        })}

        {/* 입력 행 */}
        {adding && (
          <li className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]">
            <button type="button" onClick={cancelAdding} className="mr-2 text-[#9AA0A6] text-[1rem] leading-none" aria-label="입력 취소">×</button>
            <input
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="편지 작성하기"
              className="flex-1 bg-transparent outline-none text-[#191A1C] placeholder:text-[#9AA0A6] font-pretendard text-[0.875rem]"
              onClick={(e) => e.stopPropagation()}
            />
            <CheckGray className="ml-2 w-[0.83331rem] h-[0.83331rem] shrink-0" style={{ strokeWidth: 1, stroke: "#464B51" }} />
          </li>
        )}
      </ul>

      {/* 리스트 추가 버튼(항상 회색) */}
      <button
        type="button"
        disabled={adding ? newText.trim().length === 0 : false}
        onClick={adding ? (() => { const t = newText.trim(); if (!t) return; setItems((p)=>[...p,t]); setNewText(""); setAdding(false); onAdd?.(t); }) : () => setAdding(true)}
        aria-disabled={adding ? newText.trim().length === 0 : false}
        className={[
          "mt-4 flex w-[18.0625rem] h-[2.375rem] items-center justify-center",
          "rounded-[2rem]",
          "bg-[#81878B] text-white",
          adding && !newText.trim() ? "cursor-not-allowed" : "active:opacity-90",
        ].join(" ")}
      >
        <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">리스트 추가하기</span>
      </button>

      {/* 파티 삭제 */}
      <div className="mt-2 text-right">
        <button type="button" onClick={onDelete} className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#81878B] underline">
          파티 삭제
        </button>
      </div>
    </section>
  );
}