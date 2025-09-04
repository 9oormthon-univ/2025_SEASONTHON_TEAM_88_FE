// src/components/layout/MobileScreen.jsx
import React from "react";

/**
 * 360×740(22.5rem × 46.25rem) 고정 캔버스.
 * 상단/하단 안전영역(상태바·네비바)을 pt/pb로 미리 빼 준다.
 */
export default function MobileScreen({
  children,
  className = "",
  withTopSafe = true,     // 상단 상태바 여백
  withBottomSafe = true,  // 하단 네비바 여백
}) {
  const topSafe = withTopSafe ? "pt-[max(3.5rem,env(safe-area-inset-top))]" : "";
  const bottomSafe = withBottomSafe ? "pb-[max(1.31069rem,env(safe-area-inset-bottom))]" : "";

  return (
    <main
      className={[
        "w-[22.5rem] h-[46.25rem] mx-auto bg-white relative",
        "font-pretendard",
        topSafe,
        bottomSafe,
        className,
      ].join(" ")}
    >
      {children}
    </main>
  );
}