"use client";

import { usePathname } from "next/navigation";
import { HomeHeader } from "../HomeHeader";
import { LoggedHeader } from "../LoggedHeader";

export const Header = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/" || pathname === "/selectPlan";
  return isHomepage ? <HomeHeader /> : <LoggedHeader />;
};
