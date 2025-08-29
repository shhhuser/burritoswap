export default function Footer() {
  return (
    <footer className="border-t border-line mt-14">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Burrito.fi — Affiliate Swap
      </div>
    </footer>
  );
}