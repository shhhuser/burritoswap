import { Affiliate, AffiliatePair } from "./types";

// In-memory store (reset on cold start). Replace with DB later.
const affiliates = new Map<string, Affiliate>();
const pairs = new Map<string, AffiliatePair>();

function rid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export const db = {
  createAffiliate(wallet: string): Affiliate {
    // Reuse if wallet already registered
    const existing = [...affiliates.values()].find(a => a.wallet === wallet);
    if (existing) return existing;

    const a: Affiliate = {
      id: rid("aff"),
      wallet,
      createdAt: new Date().toISOString(),
      status: "active",
    };
    affiliates.set(a.id, a);
    return a;
  },

  getAffiliate(id: string) {
    return affiliates.get(id) ?? null;
  },

  listPairs(affiliateId: string) {
    return [...pairs.values()].filter(p => p.affiliateId === affiliateId);
  },

  createPair(affiliateId: string, mint: string, quote: "SOL" | "USDC", feeBps: number) {
    const p: AffiliatePair = {
      id: rid("pair"),
      affiliateId,
      mint,
      quote,
      feeBps,
      active: true,
      createdAt: new Date().toISOString(),
    };
    pairs.set(p.id, p);
    return p;
  },
};
