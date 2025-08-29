"use client";
import { useEffect, useState } from "react";

export default function AffiliateLinks() {
  const [pairs, setPairs] = useState<any[]>([]);
  const [affId, setAffId] = useState("");

  async function load() {
    // In a real DB-backed version, you’d have an endpoint like /api/affiliate/pairs?aff=...
    // For now, this is a placeholder UI for future wiring.
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">Your Links</h1>
      <div className="text-sm opacity-70">This will list generated links once the DB is wired.</div>
      <div className="border rounded-2xl p-4">Coming soon.</div>
    </div>
  );
}
