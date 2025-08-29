"use client";

import { useState } from "react";
import FeeLine from "@/components/swap/FeeLine";
import QuoteSummary from "@/components/swap/QuoteSummary";
import { fetchQuote, buildSwapTransaction } from "@/lib/jupiter";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PLATFORM_WALLET } from "@/lib/config";
import TokenSelect from "@/components/swap/TokenSelect";
import { TOKENS } from "@/lib/tokenList";

interface SwapFormProps {
  affiliate?: string;
  initialOutMint?: string;
}

export default function SwapForm({ affiliate, initialOutMint }: SwapFormProps) {
  const [inMint, setInMint] = useState(
    "So11111111111111111111111111111111111111112"
  ); // default to wSOL
  const [outMint, setOutMint] = useState(
    initialOutMint || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  ); // default to USDC
  const [amount, setAmount] = useState("1");
  const [slippageBps, setSlippageBps] = useState(50);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Wallet hooks
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // Fee breakdown: give some bps to affiliate if provided
  const affBps = affiliate ? 20 : 0;
  const platformBps = affiliate ? 10 : 30;

  async function onSwap() {
    // Find decimals for the selected input token
    const inToken = TOKENS.find((t) => t.address === inMint);
    const decimals = inToken?.decimals ?? 9; // fallback to 9 if unknown
    const factor = Math.pow(10, decimals);

    // Convert human amount to the smallest unit (lamports or token's decimals)
    const lamports = BigInt(Math.floor(Number(amount) * factor)).toString();

    try {
      setLoading(true);

      // Fetch a quote
      const q = await fetchQuote(inMint, outMint, lamports, slippageBps);
      const route = q.data && q.data.length > 0 ? q.data[0] : null;
      setQuote(route);
      if (!route) {
        setLoading(false);
        alert("No route found for this pair.");
        return;
      }

      // Ensure the user is connected
      if (!publicKey) {
        setLoading(false);
        alert("Please connect your wallet first.");
        return;
      }

      // Determine the fee recipient (affiliate or platform)
      const referral =
        affiliate && affiliate.length > 0 ? affiliate : PLATFORM_WALLET;

      // Build the swap transaction
      const tx = await buildSwapTransaction({
        quoteResponse: route,
        userPublicKey: publicKey.toString(),
        referralAccount: referral,
      });

      // Send it via the connected wallet
      const signature = await sendTransaction(tx, connection);
      setLoading(false);
      alert(`Transaction sent! Signature:\n${signature}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to execute swap. See console for details.");
    }
  }

  // Summary fields for the quote
  const routeLabel =
    quote?.marketInfos?.map((m: any) => m.poolLabel).join(" → ") || undefined;
  const minReceived = quote
    ? Number(quote.outAmount) / 1e6 // assumes output token has 6 decimals; refine if needed
    : undefined;
  const impactBps = quote
    ? Math.round(Number(quote.priceImpactPct) * 10000)
    : undefined;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-5 md:p-6">
      <h2 className="text-xl font-semibold mb-4">Swap</h2>

      <div className="grid gap-3">
        {/* Input token selector */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">From</label>
          <TokenSelect selected={inMint} onChange={setInMint} />
        </div>

        {/* Output token selector */}
        <div className="grid gap-1">
          <label className="text-sm text-gray-600">To</label>
          <TokenSelect selected={outMint} onChange={setOutMint} />
        </div>

        {/* Amount input */}
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

        {/* Slippage input */}
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

        {/* Fee and quote summaries */}
        <FeeLine affBps={affBps} platformBps={platformBps} />
        <QuoteSummary
          route={routeLabel}
          minReceived={minReceived}
          impactBps={impactBps}
        />

        {/* Swap button */}
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
