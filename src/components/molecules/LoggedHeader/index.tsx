"use client";

import Image from "next/image";
import Link from "next/link";
import { MainNav } from "../Nav/MainNav";

export const LoggedHeader = () => {
  return (
    <header className="w-full flex justify-between items-center top-0 py-3 px-4 z-20 bg-background-heavy-800">
      <Link href="/">
        <Image
          src={
            "https://5wvwovedddgospx8.public.blob.vercel-storage.com/final-test-AjDlyTsCZuYKMZSM5RNrE0jLEIVWVa.svg"
          }
          width={180}
          height={200}
          alt="ApostAi Logo"
        />
      </Link>

      <MainNav />
    </header>
  );
};
