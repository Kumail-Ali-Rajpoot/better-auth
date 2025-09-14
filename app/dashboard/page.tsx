"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

function Page() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  async function handleLogOut() {
    await authClient.signOut(); // ensure session clears
    router.push("/"); // redirect home
  }

  if (isPending) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    router.push("/login"); // 👈 auto-redirect if not logged in
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className={`${montserrat.className} text-2xl`}>
        Welcome {session.user.email}
      </h1>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
}

export default Page;
