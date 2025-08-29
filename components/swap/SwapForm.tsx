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
  );
  const [outMint, setOutMint] = useState(
    initialOutMint || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  );
  const [amount, setAmount] = useState("1");
  const [slippageBps, setSlippageBps] = useState(50);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const affBps = affiliate ? 20 : 0;
  const platformBps = affiliate ? 10 : 30;

  async function onSwap() {
    const inToken = TOKENS.find((t) => t.address === inMint);
    const inDecimals = inToken?.decimals ?? 9;
    const lamports = BigInt(
      Math.floor(Number(amount) * Math.pow(10, inDecimals))
    ).toString();

    try {
      setLoading(true);

      const q = await fetchQuote(inMint, outMint, lamports, slippageBps);
      const route = q.data && q.data.length > 0 ? q.data[0] : null;
      setQuote(route);
      if (!route) {
        setLoading(false);
        alert("No route found for this pair.");
        return;
      }

      if (!publicKey) {
        setLoading(false);
        alert("Please connect your wallet first.");
        return;
      }

      const referral =
        affiliate && affiliate.length > 0 ? affiliate : PLATFORM_WALLET;

      const tx = await buildSwapTransaction({
        quoteResponse: route,
        userPublicKey: publicKey.toString(),
        referralAccount: referral,
      });

      const signature = await sendTransaction(tx, connection);
      setLoading(false);
      alert(`Transaction sent! Signature:\n${signature}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to execute swap. See console for details.");
    }
  }

  const routeLabel =
    quote?.marketInfos?.map((m: any) => m.poolLabel).join(" → ") || undefined;
  const outToken = TOKENS.find((t) => t.address === outMint);
  const outDecimals = outToken?.decimals ?? 6;
  const minReceived = quote
    ? Number(quote.outAmount) / Math.pow(10, outDecimals)
    : undefined;
  const impactBps = quote
    ? Math.round(Number(quote.priceImpactPct) * 10000)
    : undefined;

  return (
    <div className="w-full max-w-lg sm:max-w-xl mx-auto">
      <div className="rounded-3xl border border-gray-700 bg-white/10 backdrop-blur-md shadow-xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Swap Tokens</h2>

        {affiliate && (
          <div className="mb-4 p-3 rounded-lg bg-gray-800/70 flex items-center justify-between text-sm">
            <span>
              Affiliate: {affiliate.slice(0, 4)}…{affiliate.slice(-4)}
            </span>
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(window.location.href)
                  .then(() => alert("Link copied!"))
                  .catch(() => alert("Failed to copy link."));
              }}
              className="text-teal-400 hover:text-teal-300 transition"
            >
              Copy link
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Input token and amount */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">From Token</label>
            <TokenSelect selected={inMint} onChange={setInMint} />
            <label className="text-sm text-gray-300">Amount</label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-600 rounded-lg bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Output token and slippage */}
          <div className="space-y-2">
            <label className="text-sm text-gray-300">To Token</label>
            <TokenSelect selected={outMint} onChange={setOutMint} />
            <label className="text-sm text-gray-300">Slippage (bps)</label>
            <input
              type="number"
              min="1"
              max="1000"
              className="w-full border border-gray-600 rounded-lg bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={slippageBps}
              onChange={(e) => setSlippageBps(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="my-6 space-y-2">
          <FeeLine affBps={affBps} platformBps={platformBps} />
          <QuoteSummary
            route={routeLabel}
            minReceived={minReceived}
            impactBps={impactBps}
          />
        </div>

        <button
          onClick={onSwap}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Swap Now"}
        </button>
      </div>
    </div>
  );
}
