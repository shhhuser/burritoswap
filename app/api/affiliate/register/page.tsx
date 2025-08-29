"use client";
import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

async function signMessageOrThrow(wallet: any, text: string): Promise<string> {
  if (!wallet.signMessage) throw new Error("Wallet does not support signMessage");
  const enc = new TextEncoder();
  const sig = await wallet.signMessage(enc.encode(text));
  // Base64 encode for transport
  return btoa(String.fromCharCode(...sig));
}

export default function AffiliateRegisterPage() {
  const { publicKey, signMessage, connected } = useWallet() as any;
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [mint, setMint] = useState("");
  const [quote, setQuote] = useState<"SOL" | "USDC">("SOL");
  const [feeBps, setFeeBps] = useState(10);
  const [genLink, setGenLink] = useState<string | null>(null);
  const FEE_CAP = Number(process.env.NEXT_PUBLIC_FEE_CAP_BPS ?? 30);

  const walletStr = useMemo(() => publicKey?.toBase58() ?? "", [publicKey]);

  async function register() {
    if (!connected || !walletStr) throw new Error("Connect wallet first");
    const message = `Burrito.fi Affiliate Terms\nWallet: ${walletStr}\nDate: ${new Date().toISOString()}`;
    const signature = await signMessageOrThrow({ signMessage }, message);
    const r = await fetch("/api/affiliate/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletStr, signature, message }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Register failed");
    setAffiliateId(data.affiliate.id);
  }

  async function generate() {
    if (!affiliateId) throw new Error("Register first");
    if (!mint) throw new Error("Enter output token mint");
    if (feeBps < 0 || feeBps > FEE_CAP) throw new Error(`Fee must be 0..${FEE_CAP}`);

    const r = await fetch("/api/affiliate/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliateId, mint, quote, feeBps }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Link failed");
    setGenLink(data.link.url);
  }

  useEffect(() => { setGenLink(null); }, [affiliateId]);

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Affiliate Registration</h1>

      <div className="flex items-center gap-3">
        <WalletMultiButton />
        <div className="text-sm opacity-75">
          {walletStr ? `Wallet: ${walletStr.slice(0, 4)}…${walletStr.slice(-4)}` : "Not connected"}
        </div>
      </div>

      <button
        className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50"
        onClick={register}
        disabled={!connected}
      >
        1) Sign to Register
      </button>

      {affiliateId && (
        <div className="space-y-4 border rounded-2xl p-4">
          <div className="text-sm opacity-75">Affiliate ID: {affiliateId}</div>

          <label className="block">
            <div className="text-sm font-medium mb-1">Output Token Mint</div>
            <input
              value={mint}
              onChange={(e) => setMint(e.target.value.trim())}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v (USDC)"
            />
          </label>

          <label className="block">
            <div className="text-sm font-medium mb-1">Quote Side (input)</div>
            <select
              value={quote}
              onChange={(e) => setQuote(e.target.value as any)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="SOL">SOL</option>
              <option value="USDC">USDC</option>
            </select>
          </label>

          <label className="block">
            <div className="text-sm font-medium mb-1">Affiliate Fee (bps)</div>
            <input
              type="number"
              min={0}
              max={Number.isFinite(FEE_CAP) ? FEE_CAP : 30}
              value={feeBps}
              onChange={(e) => setFeeBps(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            />
            <div className="text-xs opacity-60 mt-1">Max {FEE_CAP} bps</div>
          </label>

          <button
            className="px-4 py-2 rounded-2xl bg-black text-white disabled:opacity-50"
            onClick={generate}
          >
            2) Generate Link
          </button>

          {genLink && (
            <div className="bg-gray-50 border rounded-xl p-3 text-sm">
              <div className="font-medium mb-1">Your link</div>
              <code className="break-all">{genLink}</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
