import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

/**
 * Provides Solana connection and wallet adapters.
 *
 * Reads the RPC endpoint from environment variables (NEXT_PUBLIC_SOLANA_RPC_URL).
 */
export function SolanaProviders({ children }: { children: ReactNode }) {
  // Use env RPC or fallback to mainnet.
  const endpoint =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
    'https://api.mainnet-beta.solana.com';

  // Instantiate wallet adapters once.
  const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Mainnet }),
  ],
  []
);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}