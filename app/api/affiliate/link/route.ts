import { NextResponse } from "next/server";
import { db } from "@/lib/memdb";
import { LinkResult } from "@/lib/types";

const FEE_CAP = Number(process.env.NEXT_PUBLIC_FEE_CAP_BPS ?? 30);

export async function POST(req: Request) {
  const { affiliateId, mint, quote, feeBps } = await req.json() as {
    affiliateId: string;
    mint: string;
    quote: "SOL" | "USDC";
    feeBps: number;
  };

  if (!affiliateId || !mint || !quote || feeBps == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  if (!["SOL", "USDC"].includes(quote)) {
    return NextResponse.json({ error: "Invalid quote" }, { status: 400 });
  }
  if (feeBps < 0 || feeBps > FEE_CAP) {
    return NextResponse.json({ error: `feeBps must be 0..${FEE_CAP}` }, { status: 400 });
  }

  const aff = db.getAffiliate(affiliateId);
  if (!aff || aff.status !== "active") {
    return NextResponse.json({ error: "Affiliate not found or disabled" }, { status: 404 });
  }

  const pair = db.createPair(affiliateId, mint, quote, feeBps);

  const search = new URLSearchParams({
    in: quote,
    out: mint,
    aff: aff.id,
    bps: String(feeBps),
  });

  const result: LinkResult = { url: `/swap?${search.toString()}` };
  return NextResponse.json({ pair, link: result });
}
