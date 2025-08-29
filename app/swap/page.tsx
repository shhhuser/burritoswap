"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Badge, Card, Field, InfoRow, PageContainer, PrimaryButton, SectionTitle, Select, TextInput, Topbar } from "@/components/ui";

function SwapInner() {
  const sp = useSearchParams();
  const inMint = sp.get("in") || "SOL";
  const outMint = sp.get("out") || "";
  const aff = sp.get("aff") || "";
  const bps = sp.get("bps") || "";

  return (
    <>
      <Topbar />
      <PageContainer>
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Burrito.fi Exchange</h1>
            <Badge>Affiliate-enabled</Badge>
          </div>
          <WalletMultiButton />
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Left: Swap Card */}
          <Card className="md:col-span-3 p-6 space-y-5">
            <SectionTitle title="Swap" subtitle="Route • Min received • Price impact • USD" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="From (input)">
                <Select defaultValue={inMint}>
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                </Select>
              </Field>
              <Field label="Amount">
                <TextInput placeholder="0.0" inputMode="decimal" />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="To (output mint)">
                <TextInput placeholder="Mint address (e.g. EPjFW...Dt1v)" defaultValue={outMint} />
              </Field>
              <Field label="Slippage">
                <Select defaultValue="0.5">
                  <option value="0.1">0.1%</option>
                  <option value="0.5">0.5%</option>
                  <option value="1">1%</option>
                  <option value="2">2%</option>
                </Select>
              </Field>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
              <InfoRow k="Route" v="—" />
              <InfoRow k="Rate" v="—" />
              <InfoRow k="Price impact" v="—" />
              <InfoRow k="Min received" v="—" />
              <InfoRow k="USD estimate" v="—" />
            </div>

            <PrimaryButton>Connect Wallet</PrimaryButton>
            <div className="text-xs text-white/50">
              Trading fees may include an affiliate fee and platform fee. All values update before you confirm.
            </div>
          </Card>

          {/* Right: Affiliate / Prefill */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6 space-y-3">
              <SectionTitle title="Prefilled from link" />
              <div className="space-y-2 text-sm">
                <InfoRow k="In" v={inMint} />
                <InfoRow k="Out" v={outMint || "—"} />
                <InfoRow k="Affiliate" v={aff || "—"} />
                <InfoRow k="Affiliate fee (bps)" v={bps || "—"} />
              </div>
            </Card>

            <Card className="p-6 space-y-3">
              <SectionTitle title="Why Burrito.fi?" />
              <div className="space-y-2 text-sm text-white/80">
                <p>Glass UI, safe defaults, and a clean route view. Fees are transparent and capped.</p>
                <p>Built around Solana-native design with neon accents and daily-income mechanics.</p>
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white/70">Loading…</div>}>
      <SwapInner />
    </Suspense>
  );
}
