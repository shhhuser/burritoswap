"use client";
import { useEffect } from "react";

export default function Modal({
  open, onClose, children, title,
}: { open: boolean; onClose: () => void; children: React.ReactNode; title?: string }) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-[min(92vw,640px)] bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-5">
        {title && <div className="text-white font-bold mb-3">{title}</div>}
        {children}
      </div>
    </div>
  );
}
