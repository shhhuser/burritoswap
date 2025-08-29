"use client";
import dynamic from "next/dynamic";

// Dynamically import WalletMultiButton so it only loads on the client
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
);

/**
 * A ready-made button for connecting/disconnecting wallets.
 * It shows the connected address or "Connect Wallet".
 */
export default function WalletConnect() {
  return <WalletMultiButton />;
}
