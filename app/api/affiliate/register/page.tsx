"use client";
import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Badge,
  Card,
  Field,
  PageContainer,
  PrimaryButton,
  SectionTitle,
  Select,
  TextInput,
  Topbar,
} from "@/components/ui";

async function signMessageOrThrow(wallet: any, text: string): Promise<string> {
  if (!wallet?.signMessage) throw new Error("Wallet does not support signMessage");
  const enc = new TextEncoder();
  const sig = await wallet.signMessage(enc.encode(text));
  return btoa(String.fromCharCode(...sig));
}

export default function AffiliateRegisterPage() {
  const { publicKey, signMessage, connected } = useWallet() as any;
  const [affiliateId, setAffiliateId] = useState<string | null>(null);
  const [mint, setMint] = useState("");
  const [quote, setQuote] = useState<"SOL" | "USDC">("SOL");
  const [feeBps, setFeeBps] = useState(10);
  const [genLink, setGenLink] = useState<string | null>(null);

  // matches your env: NEXT_PUBLIC_MAX_TOTAL_BPS
  const FEE_CAP = Number(process.env.NEXT_PUBLIC_MAX_TOTAL_BPS ?? 30);
  const walletStr = useMemo(() => publicKey?.toBase58() ?? "", [publicKey]);

  async function register() {
    if (!connected || !walletStr) throw new Error("Connect wallet first");

    const message = `Burrito.fi Affiliate Terms
Wallet: ${walletStr}
Date: ${new Date().toISOString()}`;

    const signature = await signMessageOrThrow({ signMessage }, message);

    // YOUR API PATH IS /api/register (not /api/affiliate/register)
    const r = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletStr, signature, message }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Register failed");

    setAffiliateId(data.affiliate.id);
    setGenLink(null);
  }

  async function generate() {
    if (!affiliateId) throw new Error("Register first");
    if (!mint) throw new Error("Enter output token mint");
    if (feeBps < 0 || feeBps > FEE_CAP) throw new Error(`Fee must be 0..${FEE_CAP}`);

    // your link API is at /api/affiliate/link (you already have this)
    const r = await fetch("/api/affiliate/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ affiliateId, mint, quote, feeBps }),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error || "Link failed");

    setGenLink(data.link.url);
  }

  return (
    <>
      <Topbar />
      <PageContainer>
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Affiliate Portal</h1>
            <Badge>Wallet = Identity</Badge>
          </div>
          <WalletMultiButton />
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <Card className="md:col-span-3 p-6 space-y-5">
            <SectionTitle title="Register & Generate Link" subtitle="2-step flow" />

            <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/80">
              {walletStr ? (
                <div>
                  Wallet: <span className="text-white">{walletStr.slice(0, 6)}…{walletStr.slice(-6)}</span>
                </div>
              ) : (
                <div>Connect a wallet to continue.</div>
              )}
            </div>

            <PrimaryButton onClick={register} className="mt-2" disabled={!connected}>
              1) Sign to Register
            </PrimaryButton>

            {affiliateId && (
              <div className="space-y-4">
                <div className="text-sm text-white/60">
                  Affiliate ID: <span className="text-white">{affiliateId}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Output Token Mint">
                    <TextInput
                      placeholder="Mint (e.g. EPjF...Dt1v)"
                      value={mint}
                      onChange={(e) => setMint(e.target.value)}
                    />
                  </Field>

                  <Field label="Quote Side (input)">
                    <Select
                      value={quote}
                      onChange={(e) => setQuote(e.target.value as "SOL" | "USDC")}
                    >
                      <option value="SOL">SOL</option>
                      <option value="USDC">USDC</option>
                    </Select>
                  </Field>
                </div>

                <Field label={`Affiliate Fee (bps) • Max ${FEE_CAP}`}>
                  <TextInput
                    type="number"
                    min={0}
                    max={FEE_CAP}
                    value={feeBps}
                    onChange={(e) => setFeeBps(Number(e.target.value))}
                  />
                </Field>

                <PrimaryButton onClick={generate}>2) Generate Link</PrimaryButton>

                {genLink && (
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm">
                    <div className="text-white/80 mb-1">Your link</div>
                    <code className="block break-all text-emerald-300">{genLink}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(genLink!)}
                      className="mt-3 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Card className="md:col-span-2 p-6 space-y-4">
            <SectionTitle title="Guidelines" />
            <ul className="space-y-2 text-sm text-white/80 list-disc pl-5">
              <li>Your wallet is your payout address.</li>
              <li>Fees are capped; be fair to your traders.</li>
              <li>The link opens a prefilled swap; trade instantly.</li>
            </ul>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
