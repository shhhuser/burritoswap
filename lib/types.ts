// lib/types.ts

// ----- UI swap components expect this -----
export type TokenInfo = {
  symbol: string;
  address: string; // mint address
  decimals: number;
};
// -----------------------------------------

export type QuoteSide = "SOL" | "USDC";

export type Affiliate = {
  id: string;              // short slug, e.g. "aff_8f32a"
  wallet: string;          // payout wallet (immutable)
  createdAt: string;
  status: "active" | "disabled";
};

export type AffiliatePair = {
  id: string;              // "pair_..."
  affiliateId: string;
  mint: string;            // output token mint
  quote: QuoteSide;        // default in-token side
  feeBps: number;          // affiliate fee (your platform fee will be fixed in UI later)
  active: boolean;
  createdAt: string;
};

export type LinkResult = {
  url: string;             // /swap?out=<mint>&in=<quote>&aff=<id>&bps=<fee>
};
