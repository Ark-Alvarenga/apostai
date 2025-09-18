import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import { AffiliateCodeHandler, AmplitudeStarter } from "@/components";
import { AppConfigProvider } from "@/context";
import { HotJar } from "@/helpers";

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <AppConfigProvider>
      <AmplitudeStarter />
      <ToastContainer />
      <HotJar hotJarId={""} />
      <Suspense fallback={<></>}>
        <AffiliateCodeHandler />
      </Suspense>
      <main>{children}</main>
    </AppConfigProvider>
  );
};
