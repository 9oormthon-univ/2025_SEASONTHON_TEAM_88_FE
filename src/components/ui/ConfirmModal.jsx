// src/components/ui/ConfirmModal.jsx
import React, { useEffect } from 'react';

export default function ConfirmModal({
  open,
  title = '텍스트',
  description = '상세텍스트',
  leftText = '확인',
  rightText = '취소',
  onLeft,
  onRight,
  onClose,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onMouseDown={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
    >
      {/* 카드 */}
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="relative flex h-[10.625rem] w-[20.375rem] shrink-0 flex-col items-center
                   justify-center gap-[0.875rem] rounded-[1.3125rem] bg-white
                   shadow-[0_16px_28px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
      >
        {/* X 아이콘 */}
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-[0.75rem] top-[0.75rem] grid h-7 w-7 place-items-center
                     rounded-full hover:bg-black/5 active:bg-black/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="#B3BBC2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 제목 + 설명 */}
        <div className="flex flex-col items-center mt-4">
          <h2
            className="max-w-[16.5rem] text-center text-[#191A1C]
                         font-pretendard text-[1.125rem] font-semibold leading-[1.575rem]
                         tracking-[-0.01em]"
          >
            {title}
          </h2>
          <p
            className="mt-1 max-w-[16.5rem] text-center text-[#646B72]
                        font-pretendard text-[0.75rem] font-medium leading-[1.2rem]
                        tracking-[-0.005em]"
          >
            {description}
          </p>
        </div>

        {/* 버튼 (지금 위치 유지) */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            type="button"
            onClick={onLeft}
            className="h-[3.0625rem] w-[8rem] rounded-[0.6875rem] bg-[#D4CEFE]
                       ring-1 ring-black/5 hover:brightness-95 active:brightness-90"
          >
            <span
              className="mx-auto block w-[7.375rem] text-center text-[#34296F]
                             font-pretendard text-[0.875rem] font-medium leading-[1.4rem]"
            >
              {leftText}
            </span>
          </button>

          <button
            type="button"
            onClick={onRight ?? onClose}
            className="h-[3.0625rem] w-[8rem] rounded-[0.6875rem] bg-[#EBEBEB]
                       ring-1 ring-black/5 hover:brightness-95 active:brightness-90"
          >
            <span
              className="mx-auto block w-[7.375rem] text-center text-[#323639]
                             font-pretendard text-[0.875rem] font-medium leading-[1.4rem]"
            >
              {rightText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
