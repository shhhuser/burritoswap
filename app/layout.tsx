// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SolanaProviders } from "@/lib/solana";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Burrito Affiliate Swap",
  description: "Affiliate-enabled token swap powered by Jupiter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
