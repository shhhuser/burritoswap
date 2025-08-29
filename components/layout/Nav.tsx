"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const p = usePathname();
  const Item = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const active = p === href;
    return (
      <Link
        href={href}
        className={
          "px-3 py-2 rounded-lg text-sm " +
          (active ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5")
        }
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="w-full border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 rounded-lg bg-gradient-to-br from-[#14f195] via-[#8d7aff] to-[#2fd0ff]" />
          <span className="text-white/90 text-sm tracking-wide">Burrito.fi</span>
        </Link>
        <div className="flex items-center gap-1">
          <Item href="/swap">Swap</Item>
          <Item href="/affiliate/register">Affiliate</Item>
        </div>
      </div>
    </nav>
  );
}
