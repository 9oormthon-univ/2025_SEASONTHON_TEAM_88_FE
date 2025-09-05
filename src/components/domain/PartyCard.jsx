// src/components/domain/PartyCard.jsx
import React, { useMemo, useState } from "react";
import giftbox from "../../assets/icons/giftbox.svg";

// 체크 아이콘 (회색/보라) – SVG를 컴포넌트로 불러와 stroke 제어
import { ReactComponent as CheckGray } from "../../assets/icons/check-round(gray).svg?react";
import { ReactComponent as CheckPurple } from "../../assets/icons/check-round.svg?react";

export default function PartyCard({
  title,
  tasks = [],          // 초기 리스트
  progress = 0.223,
  onAdd,               // 필요 시 외부 콜백
  onDelete,            // 필요 시 외부 콜백
}) {
  // 내부 리스트 상태(추가 반영)
  const [items, setItems] = useState(tasks);

  // 각 항목 체크 상태
  const [checked, setChecked] = useState({});

  // “리스트 추가하기” 입력 모드
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");

  // 진행바 계산
  const BAR_TOTAL_REM = 17.625;
  const filledRem = useMemo(
    () => Math.max(0, Math.min(1, progress)) * BAR_TOTAL_REM,
    [progress]
  );

  const toggleCheck = (idx) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // 입력 행 추가/취소/확정
  const startAdding = () => {
    if (!adding) setAdding(true);
  };
  const cancelAdding = () => {
    setAdding(false);
    setNewText("");
  };
  const commitAdd = () => {
    const t = newText.trim();
    if (!t) return;
    const next = [...items, t];
    setItems(next);
    setNewText("");
    setAdding(false);
    if (onAdd) onAdd(t);
  };

  // 버튼 상태
  // - 기본: 추가 모드 아니면 회색이지만 클릭으로 입력행 노출
  // - 추가 모드: 텍스트 입력 전엔 disabled, 입력하면 활성화되어 확정 동작
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
          <span className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#464B51]">
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

      {/* 준비 리스트 */}
      <div className="mt-5 flex items-center justify-between">
        <h4 className="font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
          준비 리스트
        </h4>
        <span className="inline-flex w-[3.375rem] h-[1.4375rem] items-center justify-center rounded-full bg-[#EFE8FF]">
          <span className="font-pretendard text-[0.75rem] font-medium leading-[1.2rem] text-[#44388C]">
            진행중
          </span>
        </span>
      </div>

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
                  className="w-[0.83331rem] h-[0.83331rem] shrink-0"
                  style={{ strokeWidth: 1, stroke: "#8371FD" }}
                />
              ) : (
                <CheckGray
                  className="w-[0.83331rem] h-[0.83331rem] shrink-0"
                  style={{ strokeWidth: 1, stroke: "#464B51" }}
                />
              )}
            </li>
          );
        })}

        {/* 입력 행(리스트 추가하기 클릭 시 노출) */}
        {adding && (
          <li className="flex items-center justify-between rounded-[0.5rem] bg-[#F8F8F8] px-4 py-[0.625rem]">
            {/* X(취소) */}
            <button
              type="button"
              onClick={cancelAdding}
              className="mr-2 text-[#9AA0A6] text-[1rem] leading-none"
              aria-label="입력 취소"
            >
              ×
            </button>

            {/* 입력창 */}
            <input
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="편지 작성하기"
              className="flex-1 bg-transparent outline-none text-[#191A1C] placeholder:text-[#9AA0A6] font-pretendard text-[0.875rem]"
            />

            {/* 체크(회색, 단순 디스플레이) */}
            <CheckGray
              className="ml-2 w-[0.83331rem] h-[0.83331rem] shrink-0"
              style={{ strokeWidth: 1, stroke: "#464B51" }}
            />
          </li>
        )}
      </ul>

      {/* 리스트 추가 버튼 */}
      <button
        type="button"
        disabled={buttonDisabled}
        onClick={buttonAction}
        className={[
          "mt-4 flex w-[18.0625rem] h-[2.375rem] items-center justify-center rounded-[2rem]",
          // 입력 중엔 내용 없으면 비활성 유지, 내용 있으면 진하게
          adding
            ? newText.trim()
              ? "bg-[#353A40] text-white active:opacity-90"
              : "bg-[#81878B] text-white cursor-not-allowed"
            : "bg-[#81878B] text-white", // 입력 시작 전에는 회색이지만 클릭 가능(입력 모드로 전환)
        ].join(" ")}
      >
        <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem]">
          리스트 추가하기
        </span>
      </button>

      {/* (옵션) 파티 삭제 */}
      <div className="mt-2 text-right">
        <button
          type="button"
          onClick={onDelete}
          className="font-pretendard text-[0.625rem] font-semibold leading-[1rem] text-[#81878B] underline"
        >
          파티 삭제
        </button>
      </div>
    </section>
  );
}