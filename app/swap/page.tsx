"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WalletConnect from "@/components/wallet/WalletConnect";

/**
 * This is the actual content of the swap page.
 * It calls useSearchParams(), so it must live inside a <Suspense> boundary.
 */
function SwapInner() {
  const sp = useSearchParams();
  const aff = sp.get("aff") || "—";
  const out = sp.get("out") || "—";
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Swap (shell)</h1>
      <p className="mb-1">Affiliate: {aff}</p>
      <p className="mb-4">Output mint: {out}</p>
      <p>Build &amp; Sign Swap (coming soon)</p>
      <p className="mt-4 text-sm opacity-70">
        This is the basic shell. We’ll wire wallet, Jupiter, and instant split next.
      </p>
    </div>
  );
}

export default function SwapPage() {
  // Wrap the inner component in Suspense to satisfy Next.js
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SwapInner />
    </Suspense>
  );
}
