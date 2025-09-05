// src/components/ui/ConfirmModal.jsx
import React, { useEffect } from "react";
import Icon from "./Icon"; // x 아이콘은 name="cross" 로 사용

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  onCancel,
  title = "확인",
  description = "",
  confirmText = "삭제",
  cancelText = "취소",
  showClose = true,
}) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onMouseDown={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* 모달 카드 */}
      <div
        className="relative w-[20.375rem] rounded-[1.25rem] bg-white shadow-lg"
        style={{ minHeight: "10.625rem" }}
        onMouseDown={(e) => e.stopPropagation()} // 카드 내부 클릭은 전파 방지
      >
        {/* X 버튼 */}
        {showClose && (
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="absolute right-4 top-4 grid place-items-center"
          >
            {/* 아이콘 사이즈 지정: 0.9375rem */}
            <Icon name="cross" size={0.9375} />
          </button>
        )}

        {/* 본문 */}
        <div className="px-6 pt-10 pb-6">
          {/* 제목 */}
          <h2 className="text-center font-pretendard text-[1.125rem] font-semibold leading-[1.575rem] text-[#191A1C]">
            {title}
          </h2>

          {/* 설명 */}
          {description && (
            <p className="mt-3 text-center font-pretendard text-[0.75rem] font-medium leading-[1.2rem] text-[#646B72]">
              {description}
            </p>
          )}

          {/* 버튼 영역 */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {/* 삭제(확인) 버튼 - 보라 톤 */}
            <button
              type="button"
              onClick={onConfirm}
              className="flex w-[8rem] h-[3.0625rem] items-center justify-center rounded-[0.6875rem] bg-[#D4CEFE]"
            >
              <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#34296F]">
                {confirmText}
              </span>
            </button>

            {/* 취소 버튼 - 회색 톤 */}
            <button
              type="button"
              onClick={onCancel ?? onClose}
              className="flex w-[8rem] h-[3.0625rem] items-center justify-center rounded-[0.6875rem] bg-[#EBEBEB]"
            >
              <span className="font-pretendard text-[0.875rem] font-medium leading-[1.4rem] text-[#323639]">
                {cancelText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}