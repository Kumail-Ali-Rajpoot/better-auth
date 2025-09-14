"use client";
import { useState } from "react";
import { signInUser } from "@/server/auth";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {data:session,isPending} = authClient.useSession();
  
    if(isPending) {
      return <p>Loading...</p>
    }
    if(session) {
      router.push("/dashboard")
    }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res:any = await signInUser(email, password);
      if(res.verified) {
        alert("Login successful! Check your trades.");
      }else {
        await authClient.sendVerificationEmail({
          email: email,
          callbackURL: "/dashboard" // The redirect URL after verification
      })
      alert("Please check your email resend email verification")
      }
      console.log(res);
    } catch (err) {
      console.error(err);
      alert(`Login failed. Error is : ${err}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Login Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={()=>router.push("/forgot-password")} className="underline text-white">forgot passwrd</button>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Try To Login..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
