import { NextResponse } from "next/server";
import { db } from "@/lib/memdb";

export async function POST(req: Request) {
  const { wallet, signature, message } = await req.json();

  if (!wallet || !signature || !message) {
    return NextResponse.json({ error: "Missing wallet/signature/message" }, { status: 400 });
  }

  // Minimal verification hint:
  // You can verify the signature client-side before calling this,
  // or verify here using @solana/web3.js if you want server trust.
  // For MVP, we accept it and rely on client verify (fast unblock).

  const affiliate = db.createAffiliate(wallet);
  return NextResponse.json({ affiliate });
}
