// src/components/layout/TopBar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/chevron-left.svg";
import closeIcon from "../../assets/icons/chevron-right-small.svg";

export default function TopBar({
  title,
  onBack,
  onClose,
  className = "",
}) {
  const nav = useNavigate();
  return (
    <header
      className={[
        "absolute left-0 top-0 right-0 h-12",
        "mt-[max(3.5rem,env(safe-area-inset-top))] -translate-y-[3.5rem]",
        "px-5 flex items-center gap-3 bg-transparent",
        className,
      ].join(" ")}
    >
      <button onClick={onBack ?? (() => nav(-1))} aria-label="뒤로가기">
        <img src={backIcon} alt="" className="w-6 h-6" />
      </button>

      {title && (
        <h1 className="text-[1.25rem] font-semibold text-[#323639] leading-[1.75rem]">
          {title}
        </h1>
      )}

      <div className="ml-auto">
        {onClose && (
          <button onClick={onClose} aria-label="닫기">
            <img src={closeIcon} alt="" className="w-6 h-6 rotate-180 opacity-0" />
          </button>
        )}
      </div>
    </header>
  );
}