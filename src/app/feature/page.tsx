import BetSlayer from "@betSlayer/index";
import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "IA Dashboard",
};

export default function Home() {
  const tokenCookie = cookies().get(COOKIE_KEYS.JWT_TOKEN);

  if (!tokenCookie) {
    return redirect("/");
  }

  return (
    <div className={`h-[calc(100vh-81px)] flex justify-center items-center`}>
      <BetSlayer />
    </div>
  );
}
