import React, { useEffect } from 'react';

export default function BottomSheet({ open, onClose, children }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/60"
      onMouseDown={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`w-full bg-white rounded-t-2xl shadow-lg transition-transform duration-300 ease-in-out ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 mx-auto my-3 bg-gray-300 rounded-full" />
        {children}
      </div>
    </div>
  );
}
