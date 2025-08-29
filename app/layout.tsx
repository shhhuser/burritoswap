import '@/styles/globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ReactNode } from 'react';
import { SolanaProviders } from '@/lib/solana';

export const metadata = {
  title: 'Burrito — Affiliate Swap',
  description: 'Clean Jupiter-style swap shell'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="font-[Inter]">
        <SolanaProviders>
          <header className="sticky top-0 z-30 backdrop-blur bg-soft/70 border-b border-line">
            <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
              <a href="/" className="font-extrabold text-xl tracking-tight">Burrito.fi</a>
              <nav className="text-sm">
                <a href="/swap" className="hover:opacity-80">Swap</a>
              </nav>
            </div>
          </header>
          <main className="min-h-[70vh]">{children}</main>
          <footer className="border-t border-line mt-14">
            <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-500">
              © {new Date().getFullYear()} Burrito.fi — Affiliate Swap
            </div>
          </footer>
        </SolanaProviders>
      </body>
    </html>
  );
}