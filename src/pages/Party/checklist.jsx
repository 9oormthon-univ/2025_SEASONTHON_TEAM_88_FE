import React, { useState } from "react";

// Data
const PURPOSE_OPTIONS = [
  "생일", "기념일", "프로포즈", "홈파티",
  "졸업/입학", "돌잔치", "브라이덜샤워", "젠더리빌", "기타",
];
const BUDGET_OPTIONS = [
  "2~4만원대", "4~6만원대", "6~8만원대", "8~10만원대", "10만원 이상", "기타",
];
const WHO_OPTIONS = ["나를 위해", "연인", "가족", "친구", "동료/지인", "기타"];
const ITEM_OPTIONS = ["케이크", "꽃", "풍선", "와인", "주얼리", "기타"];

/** 공통 라벨 텍스트 (Body/02: 0.875rem / 500 / 1.4rem, #191A1C) */
const labelClass =
  "font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#191A1C]";

/** 말풍선 Card (가로폭 안전) */
const Card = ({ title, subtitle, children }) => (
  <section className="px-5">
    <div
      className={[
        "inline-flex w-full max-w-full flex-col items-start",
        "gap-[0.75rem]",
        "pt-[0.875rem] pr-[1.25rem] pb-[1.25rem] pl-[1.25rem]",
        "rounded-tl-[0.125rem] rounded-tr-[1.125rem] rounded-br-[1.125rem] rounded-bl-[1.125rem]",
        "bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      {title && (
        <p className="font-pretendard text-[1rem] font-normal leading-[1.6rem] text-[#191A1C]">
          {title}
        </p>
      )}
      {subtitle && <p className="text-[12px] text-gray-500">{subtitle}</p>}
      {children}
    </div>
  </section>
);

/** Row(라디오) – 컨트롤 왼쪽 / 텍스트 오른쪽, 한 줄(넘치면 …) */
const RadioRow = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex items-start gap-[0.625rem] self-stretch min-w-0 w-full text-left",
      "px-[0.625rem] pr-[10.5625rem] py-[0.4375rem]",
      "rounded-xl border border-[#C7D3E0] bg-white transition-colors",
    ].join(" ")}
    aria-pressed={active}
  >
    <span
      className={[
        "w-5 h-5 rounded-full border grid place-items-center shrink-0",
        active ? "border-[#7F6BFF] bg-white" : "border-[#D6DEE6] bg-white",
      ].join(" ")}
      aria-hidden
    >
      <span
        className={[
          "w-2.5 h-2.5 rounded-full",
          active ? "bg-[#7F6BFF]" : "bg-transparent",
        ].join(" ")}
      />
    </span>

    <span className={`${labelClass} whitespace-nowrap truncate`}>{label}</span>
  </button>
);

/** Row(체크박스) – 컨트롤 왼쪽 / 텍스트 오른쪽, 한 줄(넘치면 …) */
const CheckRow = ({ label, checked, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "flex items-start gap-[0.625rem] self-stretch min-w-0 w-full text-left",
      "px-[0.625rem] pr-[10.5625rem] py-[0.4375rem]",
      "rounded-xl border border-[#C7D3E0] bg-white transition-colors",
    ].join(" ")}
    aria-pressed={checked}
  >
    <span
      className={[
        "w-5 h-5 rounded-md border grid place-items-center shrink-0",
        checked ? "border-[#7F6BFF] bg-white" : "border-[#D6DEE6] bg-white",
      ].join(" ")}
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 24 24">
        <path
          d="M5 12l4 4 10-10"
          stroke={checked ? "#7F6BFF" : "transparent"}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>

    <span className={`${labelClass} whitespace-nowrap truncate`}>{label}</span>
  </button>
);

/** 리스트(간격 0.75rem 보장) */
const OptionList = ({ type = "radio", options, value, onChange, isChecked }) => (
  <ul className="w-full space-y-[0.75rem]">
    {options.map((label) => (
      <li key={label} className="w-full">
        {type === "radio" ? (
          <RadioRow
            label={label}
            active={value === label}
            onClick={() => onChange(label)}
          />
        ) : (
          <CheckRow
            label={label}
            checked={isChecked?.(label)}
            onClick={() => onChange(label)}
          />
        )}
      </li>
    ))}
  </ul>
);

export default function Checklist({
  step,
  purpose, setPurpose,
  budget, setBudget,
  who, setWho,
  items, toggleItem,
}) {
  const [specialMode, setSpecialMode] = useState("없음");
  const [specialText, setSpecialText] = useState("");
  
  // The Checklist component is assumed to receive state setters from its parent.
  // To make this example runnable, useState hooks are added here.
  // In a real application, these states would likely be managed in a parent component
  // and passed down as props.

  switch (step) {
    case 0:
      return (
        <Card title="파티의 목적이 무엇인가요?">
          <OptionList
            type="radio"
            options={PURPOSE_OPTIONS}
            value={purpose}
            onChange={setPurpose}
          />
        </Card>
      );

    case 1:
      return (
        <Card title="예산 범위를 선택해주세요">
          <OptionList
            type="radio"
            options={BUDGET_OPTIONS}
            value={budget}
            onChange={setBudget}
          />
        </Card>
      );

    case 2:
      return (
        <Card title="누구와 함께할 파티인가요?">
          <OptionList
            type="radio"
            options={WHO_OPTIONS}
            value={who}
            onChange={setWho}
          />
        </Card>
      );

    case 3:
      return (
        <Card title="구매 항목을 선택해주세요">
          <OptionList
            type="check"
            options={ITEM_OPTIONS}
            isChecked={(l) => items.includes(l)}
            onChange={toggleItem}
          />
        </Card>
      );
  case 4:
  return (
    <Card
      title="특별히 준비해드릴 게 있을까요?"
      subtitle="(파티 콘셉트, 테마, 색감 등)"
    >
      <div className="w-full space-y-3">
        {/* 없음 */}
        <RadioRow
          label="없음"
          active={specialMode === "없음"}
          onClick={() => {
            setSpecialMode("없음");
            setSpecialText("");
          }}
        />

        {/* 직접입력 카드 */}
        <div
          className={[
            "w-full rounded-xl border transition-colors",
            specialMode === "직접입력"
              ? "border-[#7F6BFF] bg-[#F8F6FF]"
              : "border-[#DEE4E9] bg-white",
          ].join(" ")}
        >
          {/* 직접입력 라디오 헤더 */}
          <button
            type="button"
            onClick={() => setSpecialMode("직접입력")}
            className="w-full flex items-center gap-2 px-3 py-2 text-left"
          >
            <span
              className={[
                "w-5 h-5 rounded-full border grid place-items-center shrink-0",
                specialMode === "직접입력"
                  ? "border-[#7F6BFF] bg-white"
                  : "border-[#D6DEE6] bg-white",
              ].join(" ")}
              aria-hidden
            >
              <span
                className={[
                  "w-2.5 h-2.5 rounded-full",
                  specialMode === "직접입력" ? "bg-[#7F6BFF]" : "bg-transparent",
                ].join(" ")}
              />
            </span>
            <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#191A1C]">
              직접입력
            </span>
          </button>

          {/* 입력 박스 */}
          <div className="px-3 pb-3">
            <textarea
              disabled={specialMode !== "직접입력"}
              placeholder="파티 콘셉트, 테마, 색감 등 자유롭게 남겨주세요."
              value={specialText}
              onChange={(e) => setSpecialText(e.target.value.slice(0, 255))}
              className={[
                "mt-2 w-full h-[5.5625rem] resize-none rounded-md border px-3 py-2 outline-none",
                "font-pretendard text-[0.75rem] leading-[1.2rem] text-[#191A1C]",
                "placeholder:text-[#191A1C] placeholder:opacity-50",
                specialMode === "직접입력"
                  ? "bg-white border-[#DEE4E9]"
                  : "bg-[#F3F5F7] border-[#E6EDF2] cursor-not-allowed",
              ].join(" ")}
            />
            <div className="mt-1 text-right text-[12px]">
              <span className="text-[#7F6BFF]">{specialText.length}</span>
              <span className="text-gray-400"> / 255자</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

    case 5:
      return (
        <Card>
          <div className="text-[14px] leading-6 text-gray-800">
            <div className="inline-block bg-white rounded-2xl shadow-[0_0_0_1px_rgba(0,0,0,0.06)] p-3">
              <p>
                토리님을 위한 맞춤 패키지를 준비했어요.
                <br />
                완료버튼을 누른 뒤, 내 파티에서 만나보세요!
              </p>
            </div>
          </div>
        </Card>
      );

    default:
      return null;
  }
}