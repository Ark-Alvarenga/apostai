import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MatchTracker from "../../../features/matchTracker";

export default function Home() {
  return (
    <div
      className={`h-[calc(100vh-81px)] bg-background-heavy-500 flex justify-center items-start`}
    >
      <MatchTracker period="past" />
    </div>
  );
}
