"use client";
import { useState } from 'react';
import TokenPicker from '@/components/swap/TokenPicker';
import FeeLine from '@/components/swap/FeeLine';
import QuoteSummary from '@/components/swap/QuoteSummary';

interface SwapFormProps {
  affiliate?: string;
  initialOutMint?: string;
}

/**
 * Placeholder swap form. Accepts amount and mint inputs but does not yet call
 * Jupiter for quotes or build transactions. Shows fee breakdown and quote summary.
 */
export default function SwapForm({ affiliate, initialOutMint }: SwapFormProps) {
  const [inMint, setInMint] = useState<string>('So11111111111111111111111111111111111111112'); // wSOL
  const [outMint, setOutMint] = useState<string>(initialOutMint || 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC
  const [amount, setAmount] = useState<string>('1');
  const [slippageBps, setSlippageBps] = useState<number>(50);
  // Example bps; in real implementation read from chain.
  const affBps = 10;
  const platformBps = 10;

  function onSwap() {
    alert('Swap logic will be implemented in a future step');
  }

  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-sm text-gray-600">Input Mint</label>
        <TokenPicker value={inMint} onChange={setInMint} />
      </div>
      <div className="grid gap-1">
        <label className="text-sm text-gray-600">Output Mint</label>
        <TokenPicker value={outMint} onChange={setOutMint} />
      </div>
      <div className="grid gap-1">
        <label className="text-sm text-gray-600">Amount</label>
        <input
          type="number"
          className="w-full border rounded-xl px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
      </div>
      <div className="grid gap-1">
        <label className="text-sm text-gray-600">Slippage (bps)</label>
        <input
          type="number"
          className="w-full border rounded-xl px-3 py-2"
          value={slippageBps}
          onChange={(e) => setSlippageBps(Number(e.target.value))}
          min="1"
          max="1000"
        />
      </div>
      <FeeLine affBps={affBps} platformBps={platformBps} />
      <QuoteSummary route="–" minReceived={0} impactBps={0} />
      <button
        onClick={onSwap}
        className="mt-4 w-full h-12 rounded-xl bg-ink text-white font-semibold hover:opacity-90"
      >
        Swap
      </button>
    </div>
  );
}