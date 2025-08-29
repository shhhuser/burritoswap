"use client";
export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 text-sm text-white/60 flex flex-col md:flex-row items-center md:justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-5 w-5 rounded-md bg-gradient-to-br from-[#8d7aff] via-[#2fd0ff] to-[#14f195]" />
          <span>Burrito.fi • Solana-first, affiliate-enabled exchange</span>
        </div>
        <div className="opacity-70">© {new Date().getFullYear()} Burrito Finance</div>
      </div>
    </footer>
  );
}
