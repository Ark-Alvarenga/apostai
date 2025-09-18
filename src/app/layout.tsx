import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Header, PageLayout } from "@/components";
import { metadata } from "@/constants/seo";

import { Nunito } from "next/font/google";

export { metadata };

const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ptBR">
      <body
        className={`h-auto smooth-scroll antialiased ${nunito.className} bg-theme-gray-500`}
      >
        <Header />
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
