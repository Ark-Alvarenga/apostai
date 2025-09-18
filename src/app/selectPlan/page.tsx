import { SubscribeSection } from "@/components";
import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Assinaturas",
};

export default function Home() {
  const tokenCookie = cookies().get(COOKIE_KEYS.JWT_TOKEN);

  if (!tokenCookie) {
    return redirect("/");
  }

  return (
    <div className="py-16">
      <SubscribeSection />
    </div>
  );
}
