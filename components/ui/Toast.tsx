"use client";
import { useEffect, useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  function toast(text: string) { setMsg(text); setTimeout(() => setMsg(null), 2400); }
  const node = <Toast message={msg} />;
  return { toast, node };
}

function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] 
                    bg-white/10 border border-white/20 text-white px-4 py-2 rounded-xl shadow-lg">
      {message}
    </div>
  );
}
