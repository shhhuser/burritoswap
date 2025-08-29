"use client";

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-5xl mx-auto px-4 md:px-6">{children}</div>;
}

export function Topbar() {
  return (
    <div className="sticky top-0 z-40">
      <div className="backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 rounded-full bg-gradient-to-br from-[#14f195] via-[#8d7aff] to-[#2fd0ff]" />
            <div className="text-sm tracking-wide text-white/80">Burrito.fi Exchange</div>
            <LiveDot />
          </div>
          <div className="flex items-center gap-2">
            {/* WalletMultiButton renders on pages */}
            <span className="hidden sm:block text-xs text-white/50">SOLANA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LiveDot() {
  return (
    <span className="ml-2 relative inline-flex">
      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
    </span>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "bg-white/5 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 backdrop-blur-md " +
        "hover:border-white/20 " + className
      }
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      {subtitle && <div className="text-xs md:text-sm text-white/60">{subtitle}</div>}
    </div>
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "w-full py-3 rounded-xl font-semibold tracking-wide " +
        "bg-gradient-to-r from-[#8d7aff] via-[#2fd0ff] to-[#14f195] " +
        "hover:brightness-110 active:scale-[0.99] transition " + className
      }
    />
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-xs uppercase tracking-widest text-white/60">{label}</div>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={
        "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white " +
        "placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#8d7aff] " +
        className
      }
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { className = "", ...rest } = props;
  return (
    <select
      {...rest}
      className={
        "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white " +
        "focus:outline-none focus:ring-2 focus:ring-[#8d7aff] " + className
      }
    />
  );
}

export function InfoRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/60">{k}</span>
      <span className="text-white">{v}</span>
    </div>
  );
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-lg text-[11px] bg-white/10 border border-white/10 text-white/70">
      {children}
    </span>
  );
}
