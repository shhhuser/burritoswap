"use client";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  return (
    <main className="min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-16">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 rounded-2xl bg-gradient-to-br from-[#14f195] via-[#8d7aff] to-[#2fd0ff]" />
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Burrito.fi Exchange</h1>
          </div>
          <WalletMultiButton />
        </header>

        <section className="grid md:grid-cols-5 gap-6">
          {/* Hero / Copy */}
          <div className="md:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                Swap. Share. Earn.<br />
                <span className="text-white/70">Affiliate-enabled on Solana.</span>
              </h2>
              <p className="mt-4 text-white/70">
                A clean, fast swap with transparent fees and partner links. Glass UI, Solana neon accents—just like burrito.fi.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/swap"
                  className="px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#8d7aff] via-[#2fd0ff] to-[#14f195] hover:brightness-110 transition"
                >
                  Launch Swap
                </Link>
                <Link
                  href="/affiliate/register"
                  className="px-5 py-3 rounded-xl font-semibold border border-white/15 bg-white/5 hover:bg-white/10 transition text-white/90"
                >
                  Become a Partner
                </Link>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
                <Stat k="Fast Routes" v="Jupiter" />
                <Stat k="Max Total Fee" v={`${process.env.NEXT_PUBLIC_MAX_TOTAL_BPS ?? 30} bps`} />
                <Stat k="Chain" v={(process.env.NEXT_PUBLIC_SOLANA_CLUSTER || "mainnet").toString()} />
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="md:col-span-2 space-y-6">
            <Card title="Why Burrito.fi?">
              <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                <li>Glassmorphic UI with Solana neon accents.</li>
                <li>Affiliate links with capped, transparent fees.</li>
                <li>Clean route panel: rate, impact, min received, USD.</li>
              </ul>
            </Card>

            <Card title="Get Started">
              <ol className="list-decimal pl-5 text-white/80 text-sm space-y-2">
                <li>Connect wallet (Phantom/Solflare).</li>
                <li>Swap tokens or create a partner link.</li>
                <li>Share your link and earn on volume.</li>
              </ol>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <div className="text-white/60">{k}</div>
      <div className="text-white font-semibold">{v}</div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      <div className="text-white font-bold mb-2">{title}</div>
      {children}
    </div>
  );
}
