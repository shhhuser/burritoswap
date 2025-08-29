"use client";
import { useEffect, useState } from "react";
import { TOKENS, TokenInfo } from "@/lib/tokenList";

/**
 * TokenSelect displays available tokens in a dark‑themed select.
 */
export default function TokenSelect({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    setTokens(TOKENS);
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-600 rounded-lg bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
    >
      {tokens.map((token) => (
        <option key={token.address} value={token.address}>
          {token.symbol}
        </option>
      ))}
    </select>
  );
}
