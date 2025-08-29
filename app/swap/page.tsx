"use client";
import { useSearchParams } from "next/navigation";
import SwapForm from "@/components/swap/SwapForm";

/**
 * Swap page.  Reads ?aff=<affiliate>&out=<mint> from the URL and preloads the form.
 */
export default function SwapPage() {
  const sp = useSearchParams();
  const affiliate = sp.get("aff") || undefined;
  const outMint = sp.get("out") || undefined;

  return (
    <div className="my-8">
      <SwapForm affiliate={affiliate} initialOutMint={outMint} />
    </div>
  );
}
