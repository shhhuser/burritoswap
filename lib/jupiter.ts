import { Transaction } from "@solana/web3.js";

/**
 * Fetch a swap quote from Jupiter's public API.
 * @param inputMint   Mint address of the token being sold.
 * @param outputMint  Mint address of the token being bought.
 * @param amount      Amount to swap, in the smallest unit (e.g. lamports).
 * @param slippageBps Slippage tolerance in basis points (50 = 0.5%).
 */
export async function fetchQuote(
  inputMint: string,
  outputMint: string,
  amount: string,
  slippageBps: number
) {
  const url = new URL("https://quote-api.jup.ag/v6/quote");
  url.searchParams.set("inputMint", inputMint);
  url.searchParams.set("outputMint", outputMint);
  url.searchParams.set("amount", amount);
  url.searchParams.set("slippageBps", slippageBps.toString());
  url.searchParams.set("onlyDirectRoutes", "false");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Failed to fetch quote: ${res.status}`);
  }
  return res.json();
}

/**
 * Build a swap transaction from a Jupiter quote.
 * This calls Jupiter's swap API, passing the quote and your referral account.
 * It returns a Transaction object ready to sign.
 */
export async function buildSwapTransaction(opts: {
  quoteResponse: any;
  userPublicKey: string;
  referralAccount?: string;
}): Promise<Transaction> {
  const res = await fetch("https://quote-api.jup.ag/v6/swap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quoteResponse: opts.quoteResponse,
      userPublicKey: opts.userPublicKey,
      wrapUnwrapSol: true,
      feeAccount: opts.referralAccount || null,
    }),
  });
  if (!res.ok) {
    throw new Error(`Failed to build swap transaction: ${res.status}`);
  }
  const data = await res.json();
  // Jupiter returns a base64 serialized transaction
  const tx = Transaction.from(Buffer.from(data.swapTransaction, "base64"));
  return tx;
}
