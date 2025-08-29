"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Pretty route router: captures affiliate and mint from the URL
 * and redirects to the swap page with query parameters. The mode
 * defaults to exactIn so that the fee is paid in the output token.
 */
export default function PrettyLinkRouter() {
  const params = useParams<{ affiliate: string; mint: string }>();
  const router = useRouter();
  useEffect(() => {
    if (params?.affiliate && params?.mint) {
      router.replace(
        `/swap?aff=${params.affiliate}&out=${params.mint}&mode=exactIn`
      );
    }
  }, [params, router]);
  return null;
}