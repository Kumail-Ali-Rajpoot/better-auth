"use client";
import { useState } from "react";
import { signUpUser } from "@/server/auth";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signUpUser(name, email, password);
      alert("Signup successful! Please verify your email.");
      console.log(res);
    } catch (err) {
      console.error(err);
      alert(`Signup failed. Error is : ${err}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
