import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="card p-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Burrito Affiliate Swap
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          Jupiter-style swapping with instant affiliate splits. Share a partner link and get paid per trade.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/swap"
            className="px-6 py-3 rounded-xl bg-ink text-white font-semibold hover:opacity-90 transition"
          >
            Open Swap
          </Link>
          <Link
            href="/p/DEMO_AFFILIATE_PUBKEY/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            className="px-6 py-3 rounded-xl bg-white border border-line hover:bg-soft transition"
          >
            Demo Partner Link
          </Link>
        </div>
      </div>
    </div>
  );
}