import { ConfirmPaymentModule } from "@/components";
import { COOKIE_KEYS } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Pagamento Sucesso",
};

export default function Home() {
  const tokenCookie = cookies().get(
    COOKIE_KEYS.JWT_TOKEN || "ODING_FORGE_AUTH_JWT_TOKEN"
  );

  if (!tokenCookie) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-[100vh]">
        <ConfirmPaymentModule />
      </div>
    </Suspense>
  );
}
