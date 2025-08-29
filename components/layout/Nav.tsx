import WalletConnect from '@/components/wallet/WalletConnect';

export default function Nav() {
  return (
    <header className="w-full border-b border-line bg-soft/70 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-extrabold text-xl tracking-tight">
          Burrito.fi
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/swap" className="hover:opacity-80">
            Swap
          </a>
          <WalletConnect />
        </nav>
      </div>
    </header>
  );
}