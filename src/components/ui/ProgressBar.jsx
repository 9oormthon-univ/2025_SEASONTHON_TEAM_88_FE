import React from "react";

export default function ProgressBar({ value = 0, className = "" }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={["w-full px-5", className].join(" ")}>
      <div className="h-[6px] w-full rounded-full bg-gray-200">
        <div
          className="h-[6px] rounded-full bg-[#8371FD]"
          style={{ width: `${v}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-[#8371FD] text-right">{v}%</div>
    </div>
  );
}