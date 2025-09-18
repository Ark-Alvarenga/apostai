import { CancelPaymentModule } from "@/components";
import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Pagamento Cancelado",
};

export default function Home() {
  const tokenCookie = cookies().get(COOKIE_KEYS.JWT_TOKEN);

  if (!tokenCookie) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-[100vh]">
        <CancelPaymentModule />
      </div>
    </Suspense>
  );
}
