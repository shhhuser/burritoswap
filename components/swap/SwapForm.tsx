"use client";
import { useState } from "react";
import TokenPicker from "./TokenPicker";
import Skeleton from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { TokenInfo } from "@/lib/types";

const DEFAULTS: TokenInfo[] = [
  { symbol: "SOL", address: "So11111111111111111111111111111111111111112", decimals: 9 },
  { symbol: "USDC", address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", decimals: 6 },
];

export default function SwapForm() {
  const { toast, node: Toast } = useToast();

  const [from, setFrom] = useState<TokenInfo | null>(DEFAULTS[0] ?? null);
  const [to, setTo] = useState<TokenInfo | null>(DEFAULTS[1] ?? null);
  const [inAmt, setInAmt] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [loading, setLoading] = useState(false);

  async function onQuote() {
    setLoading(true);
    try {
      // wire Jupiter here later
      await new Promise((r) => setTimeout(r, 500));
      toast("Route updated");
    } catch (e: any) {
      toast(e?.message ?? "Failed to get quote");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 shadow-2xl">
      <div className="text-xl font-bold text-white">Swap</div>

      <TokenPicker
        side="from"
        token={from}
        onToken={(t) => setFrom(t)}
        amount={inAmt}
        onAmount={setInAmt}
        list={DEFAULTS}
      />

      <TokenPicker
        side="to"
        token={to}
        onToken={(t) => setTo(t)}
        list={DEFAULTS}
      />

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <div className="mb-2 text-xs uppercase tracking-widest text-white/60">Slippage</div>
          <select
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white 
                       focus:outline-none focus:ring-2 focus:ring-[#8d7aff]"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
          >
            <option value="0.1">0.1%</option>
            <option value="0.5">0.5%</option>
            <option value="1">1%</option>
            <option value="2">2%</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            onClick={onQuote}
            className="w-full py-3 rounded-xl font-semibold 
                       bg-gradient-to-r from-[#8d7aff] via-[#2fd0ff] to-[#14f195]
                       hover:brightness-110 active:scale-[0.99] transition"
          >
            Get Route
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
        {loading ? (
          <>
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </>
        ) : (
          <>
            <Row k="Route" v="—" />
            <Row k="Rate" v="—" />
            <Row k="Price impact" v="—" />
            <Row k="Min received" v="—" />
          </>
        )}
      </div>

      {Toast}
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/60">{k}</span>
      <span className="text-white">{v}</span>
    </div>
  );
}
