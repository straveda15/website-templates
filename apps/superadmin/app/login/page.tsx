"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6eee5] px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-[#eaded3] bg-[#fffaf5] p-8 shadow-sm">
        <h1 className="font-serif text-[26px] font-semibold text-[#332720]">Superadmin</h1>
        <p className="mt-1 text-[13px] text-[#857466]">Sign in to generate a client project.</p>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-[11px] font-semibold text-[#6f6258]">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-lg border border-[#eaded3] bg-white px-3 text-[13px] outline-none focus:border-[#c88a51]"
          />
        </label>

        {error && (
          <div className="mt-4 rounded-lg border border-[#e5c9bf] bg-[#fff5f1] px-3 py-2 text-[12px] text-[#8b5548]">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 h-11 w-full rounded-lg bg-[#9b5e2f] text-[13px] font-semibold text-white transition hover:bg-[#7e4825] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
