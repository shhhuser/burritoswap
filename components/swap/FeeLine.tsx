/**
 * Displays the affiliate and platform fee split. Receives basis points for both parts.
 */
export default function FeeLine({
  affBps,
  platformBps
}: {
  affBps: number;
  platformBps: number;
}) {
  const total = affBps + platformBps;
  return (
    <div className="text-sm text-gray-600">
      Fees:{' '}
      <span className="font-medium">{total} bps</span>{' '}
      <span className="opacity-70">
        (Affiliate {affBps} + Platform {platformBps})
      </span>
    </div>
  );
}