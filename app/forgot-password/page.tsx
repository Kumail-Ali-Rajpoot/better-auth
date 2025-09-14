"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      // ✅ Correct method: forgotPassword
      await authClient.forgetPassword({ email })
      setStatus("✅ Check your email for reset instructions.");
    } catch (err: any) {
      setStatus("❌ Failed to send reset link: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-center font-medium ${
              status.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
