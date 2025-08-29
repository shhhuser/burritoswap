"use client";
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

/**
 * Button that opens the wallet modal or displays connected state.
 */
export default function WalletConnect() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <button
      onClick={() => setVisible(true)}
      className="px-4 h-10 rounded-xl bg-ink text-white font-semibold hover:opacity-90"
    >
      {connected
        ? `${publicKey?.toBase58().slice(0, 4)}…${publicKey?.toBase58().slice(-4)}`
        : 'Connect Wallet'}
    </button>
  );
}