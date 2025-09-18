import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MatchTracker from "../../../features/matchTracker";

export default function Home() {
  const tokenCookie = cookies().get(COOKIE_KEYS.JWT_TOKEN);

  if (!tokenCookie) {
    return redirect("/");
  }

  return (
    <div
      className={`h-[calc(100vh-81px)] bg-theme-gray-500 flex justify-center items-start`}
    >
      <MatchTracker period="future" />
    </div>
  );
}
