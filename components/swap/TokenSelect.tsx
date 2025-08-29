"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { TokenInfo } from "@/lib/types"; // adjust if your type differs

export default function TokenSelect({
  label, token, onPick, list,
}: {
  label: string;
  token?: TokenInfo | null;
  onPick: (t: TokenInfo) => void;
  list: TokenInfo[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-widest text-white/60">{label}</div>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-left
                   hover:border-white/20 transition flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="h-6 w-6 rounded-full bg-white/10 border border-white/10" />
          <div className="text-white">{token?.symbol ?? "Select token"}</div>
        </div>
        <div className="text-white/50 text-xs">{short(token?.address ?? "")}</div>
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Select a token">
        <div className="space-y-3">
          <input
            placeholder="Search by symbol or mint"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white
                       placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8d7aff]"
            onChange={(e) => {/* optional: filter client-side */}}
          />
          <div className="max-h-[50vh] overflow-auto space-y-1">
            {list.map((t) => (
              <button
                key={t.address}
                onClick={() => { onPick(t); setOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg 
                           hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-white/10 border border-white/10" />
                  <div className="text-white">{t.symbol}</div>
                </div>
                <div className="text-white/50 text-xs">{short(t.address)}</div>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

function short(a: string) {
  return a ? `${a.slice(0, 4)}…${a.slice(-4)}` : "—";
}
