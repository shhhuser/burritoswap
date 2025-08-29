// lib/tokenList.ts

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
}

// A small set of well‑known tokens.  Add more as needed.
export const TOKENS: TokenInfo[] = [
  {
    address: "So11111111111111111111111111111111111111112",
    symbol: "wSOL",
    name: "Wrapped SOL",
    decimals: 9,
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
  },
  {
    address: "Bxxkv6zQ7K4z5Lu6n3v2mKqiZ1tXDs2x8Z64i19a4YVY",
    symbol: "USDT",
    name: "Tether",
    decimals: 6,
  },
  {
    address: "mSoLzCrK2pvjtS5iMG5U8JxojkK2Wzn5R6V6GPfMTKA",
    symbol: "mSOL",
    name: "Marinade SOL",
    decimals: 9,
  },
  {
    address: "7dHbWXpJPtS5PrzdehoJDC45FLnFi7bELP9jit7nG6m1",
    symbol: "stSOL",
    name: "Lido SOL",
    decimals: 9,
  },
];
