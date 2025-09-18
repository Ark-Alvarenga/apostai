import { ConfirmLoginModule } from "@/components";
import React, { Suspense } from "react";

export const metadata = {
  title: "Confirmando Usuário",
};

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-[100vh]">
        <ConfirmLoginModule />
      </div>
    </Suspense>
  );
}
