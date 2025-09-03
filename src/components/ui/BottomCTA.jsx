// src/components/layout/BottomCTA.jsx
import React from "react";

/**
 * 하단 고정 CTA. safe-area를 감안해 떠 있게 배치.
 */
export default function BottomCTA({
  children = "다음",
  disabled = false,
  onClick,
  className = "",
  active = true, // 보라색/회색
}) {
  return (
    <div
      className={[
        "absolute left-0 right-0",
        "bottom-[max(1.31069rem,env(safe-area-inset-bottom))]",
        "px-5",
      ].join(" ")}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        className={[
          "w-full h-[3rem] rounded-[0.5rem] text-white font-semibold text-[1rem] leading-[1.4rem]",
          active ? "bg-[#8371FD]" : "bg-[#81878B]",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          className,
        ].join(" ")}
      >
        {children}
      </button>
    </div>
  );
}