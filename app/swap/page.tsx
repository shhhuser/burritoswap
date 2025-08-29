"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function SwapInner() {
  const sp = useSearchParams();
  const inMint = sp.get("in") || "SOL";
  const outMint = sp.get("out") || "";
  const aff = sp.get("aff") || "";
  const bps = sp.get("bps") || "";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Burrito.fi Exchange</h1>
        <WalletMultiButton />
      </div>

      <div className="border rounded-2xl p-4 space-y-3">
        <div className="text-sm opacity-70">Prefilled from link</div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="opacity-60">In:</span> {inMint}</div>
          <div><span className="opacity-60">Out:</span> {outMint || "—"}</div>
          <div><span className="opacity-60">Affiliate:</span> {aff || "—"}</div>
          <div><span className="opacity-60">Affiliate fee (bps):</span> {bps || "—"}</div>
        </div>
      </div>

      {/* TODO: Wire Jupiter Quote + Swap tx build here.
          - Attach your single referral account (treasury) and total fee.
          - Add Memo: `aff:${aff}|mint:${outMint}|bps:${bps}` for attribution.
          - Show Rate / Min received / Price impact / Route / USD.
      */}
      <div className="border rounded-2xl p-4">
        <div className="opacity-70 text-sm mb-2">Swap Panel</div>
        <div className="text-sm">Route, Min received, Price impact, USD — coming next.</div>
      </div>
    </div>
  );
}

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <SwapInner />
    </Suspense>
  );
}
