"use client";
import TokenSelect from "./TokenSelect";
import { TokenInfo } from "@/lib/types";

export default function TokenPicker({
  side, token, onToken, amount, onAmount, list,
}: {
  side: "from" | "to";
  token?: TokenInfo | null;
  onToken: (t: TokenInfo) => void;
  amount?: string;
  onAmount?: (v: string) => void;
  list: TokenInfo[];
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <TokenSelect
          label={side === "from" ? "From" : "To"}
          token={token}
          onPick={onToken}
          list={list}
        />
      </div>
      <div className="col-span-1">
        <div className="mb-2 text-xs uppercase tracking-widest text-white/60">Amount</div>
        <input
          value={amount ?? ""}
          onChange={(e) => onAmount?.(e.target.value)}
          placeholder="0.00"
          inputMode="decimal"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-white
                     placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8d7aff]"
        />
      </div>
    </div>
  );
}
