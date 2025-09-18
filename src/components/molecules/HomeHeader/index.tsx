import Image from "next/image";
import Link from "next/link";

export const HomeHeader = () => {
  return (
    <header className="w-full flex justify-between items-center fixed top-0 py-3 px-4 z-20 bg-transparent">
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
    </header>
  );
};
