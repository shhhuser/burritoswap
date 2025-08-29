"use client";
import { useState } from 'react';

/**
 * Placeholder component for a token picker. Currently accepts manual mint input.
 */
export default function TokenPicker({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <input
      className="w-full border rounded-xl px-3 py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Mint address"
    />
  );
}