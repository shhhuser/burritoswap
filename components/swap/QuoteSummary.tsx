import { fmt } from '@/lib/utils';

interface QuoteProps {
  route?: string;
  minReceived?: number;
  impactBps?: number;
}

/**
 * Displays quote details: route, minimum received, price impact.
 */
export default function QuoteSummary({ route, minReceived, impactBps }: QuoteProps) {
  return (
    <div className="grid gap-1 text-sm">
      <div className="flex justify-between">
        <span>Route</span>
        <span className="font-medium">{route || '-'}</span>
      </div>
      <div className="flex justify-between">
        <span>Min received</span>
        <span className="font-medium">{fmt(minReceived ?? 0)}</span>
      </div>
      <div className="flex justify-between">
        <span>Price impact</span>
        <span className="font-medium">
          {impactBps ? `${(impactBps / 100).toFixed(2)}%` : '-'}
        </span>
      </div>
    </div>
  );
}