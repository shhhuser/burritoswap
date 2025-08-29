"use client";

import { useState } from "react";
import FeeLine from "@/components/swap/FeeLine";
import QuoteSummary from "@/components/swap/QuoteSummary";
import { fetchQuote, buildSwapTransaction } from "@/lib/jupiter";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PLATFORM_WALLET } from "@/lib/config";

interface SwapFormProps {
  affiliate?: string;
  initialOutMint?: string;
}

/**
 * Swap form with quoting and transaction sending.
 * If an affiliate wallet is provided via props, that wallet will receive the fee.
 */
export default function SwapForm({ affiliate, initialOutMint }: SwapFormProps) {
  // Default to wSOL → USDC
  const [inMint, setInMint] = useState(
    "So11111111111111111111111111111111111111112"
  );
  const [outMint, setOutMint] = useState(
    initialOutMint || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
  const [amount, setAmount] = useState("1");
  const [slippageBps, setSlippageBps] = useState(50);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Wallet hooks
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // Fee breakdown: give affiliate some bps if present, otherwise all to platform
  const affBps = affiliate ? 20 : 0;
  const platformBps = affiliate ? 10 : 30;

  async function onSwap() {
    // Convert human amount to lamports (approx. 9 decimals)
    const lamports = BigInt(Math.floor(Number(amount) * 1e9)).toString();

    try {
      setLoading(true);

      // Step 1: get a quote from Jupiter
      const q = await fetchQuote(inMint, outMint, lamports, slippageBps);
      const route = q.data && q.data.length > 0 ? q.data[0] : null;
      setQuote(route);
      if (!route) {
        setLoading(false);
        alert("No route found for this pair.");
        return;
      }

      // Step 2: ensure the user is connected
      if (!publicKey) {
        setLoading(false);
        alert("Please connect your wallet first.");
        return;
      }

      // Step 3: choose who receives the fee
      const referral =
        affiliate && affiliate.length > 0 ? affiliate : PLATFORM_WALLET;

      // Step 4: build the swap transaction
      const tx = await buildSwapTransaction({
        quoteResponse: route,
        userPublicKey: publicKey.toString(),
        referralAccount: referral,
      });

      // Step 5: send it through the connected wallet
      const signature = await sendTransaction(tx, connection);
      setLoading(false);
      alert(`Transaction sent! Signature:\n${signature}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to execute swap. See console for details.");
    }
  }

  // Derive display values from the quote
  const routeLabel =
    quote?.marketInfos?.map((m: any) => m.poolLabel).join(" → ") || undefined;
  const minReceived = quote
    ? Number(quote.outAmount) / 1e6 // rough conversion assuming 6 decimals
    : undefined;
  const impactBps = quote
    ? Math.round(Number(quote.priceImpactPct) * 10000)
    : undefined;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-5 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Swap</h2>

      <div className="grid gap-3">
        {/* From mint */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">From (mint)</label>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={inMint}
            onChange={(e) => setInMint(e.target.value)}
          />
        </div>

        {/* To mint */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">To (mint)</label>
          <input
            className="w-full border rounded-xl px-3 py-2"
            value={outMint}
            onChange={(e) => setOutMint(e.target.value)}
          />
        </div>

        {/* Amount */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">Amount</label>
          <input
            type="number"
            min="0"
            className="w-full border rounded-xl px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Slippage */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">Slippage (bps)</label>
          <input
            type="number"
            min="1"
            max="1000"
            className="w-full border rounded-xl px-3 py-2"
            value={slippageBps}
            onChange={(e) => setSlippageBps(Number(e.target.value))}
          />
        </div>

        {/* Fee breakdown */}
        <FeeLine affBps={affBps} platformBps={platformBps} />

        {/* Quote summary */}
        <QuoteSummary
          route={routeLabel}
          minReceived={minReceived}
          impactBps={impactBps}
        />

        <button
          onClick={onSwap}
          disabled={loading}
          className="mt-4 py-2 px-4 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Swap"}
        </button>
      </div>
    </div>
  );
}
