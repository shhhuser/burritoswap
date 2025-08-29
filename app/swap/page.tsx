"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from 'next/navigation';
import WalletConnect from '@/components/wallet/WalletConnect';

export default function SwapPage() {
  const sp = useSearchParams();
  const aff = sp.get('aff') || '—';
  const out = sp.get('out') || '—';
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Swap (shell)</h2>
          <WalletConnect />
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Affiliate: <span className="font-mono break-all">{aff}</span>
        </p>
        <p className="text-sm text-gray-600">
          Output mint: <span className="font-mono break-all">{out}</span>
        </p>
        <button className="mt-6 w-full h-12 rounded-xl bg-ink text-white font-semibold hover:opacity-90">
          Build & Sign Swap (coming soon)
        </button>
        <p className="mt-4 text-xs text-gray-500">
          This is the basic shell. We’ll wire wallet, Jupiter, and instant split next.
        </p>
      </div>
    </div>
  );
}