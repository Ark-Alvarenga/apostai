"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AFFILIATE_CODE_KEY } from "@/constants";

export const AffiliateCodeHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const affiliateCode = searchParams?.get(AFFILIATE_CODE_KEY);
    console.log("Affiliate Code >>>>>>", affiliateCode);
    if (affiliateCode) {
      localStorage.setItem(AFFILIATE_CODE_KEY, affiliateCode);
    }
  }, [searchParams]);

  return null;
};
