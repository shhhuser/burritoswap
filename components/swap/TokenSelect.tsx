// components/swap/TokenSelect.tsx
"use client";
import { useEffect, useState } from "react";
import { TOKENS, TokenInfo } from "@/lib/tokenList";

/**
 * A basic dropdown to choose a token.  It loads the list from TOKENS.
 * Props:
 *   selected – the currently selected mint address
 *   onChange – callback when the user selects a different token
 */
export default function TokenSelect({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  // Load the tokens once on mount
  useEffect(() => {
    // In a real app you might fetch from Jupiter's token list API.
    setTokens(TOKENS);
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl px-3 py-2"
    >
      {tokens.map((token) => (
        <option key={token.address} value={token.address}>
          {token.symbol}
        </option>
      ))}
    </select>
  );
}
