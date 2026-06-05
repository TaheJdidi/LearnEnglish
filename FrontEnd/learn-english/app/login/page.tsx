"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await loginApi({
      email,
      password,
    });

    login(result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);

    router.push("/dashboard");

  } catch (err: unknown) {
    setError((err as Error)?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#111827,_#0b1220_45%,_#05070b_100%)] px-4 py-10 text-slate-100">
      <div className="w-full max-w-4xl grid lg:grid-cols-[0.95fr_1.05fr] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-2xl">
        <div className="p-8 md:p-12 bg-gradient-to-br from-sky-400/15 via-transparent to-emerald-400/10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/40 bg-sky-200/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-sky-100">
            Welcome Back
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
            Pick up where you left off.
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-200/80 leading-relaxed">
            Review your lessons, keep streaks alive, and see what is next on your plan.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <p className="text-sm text-slate-200/70">New here?</p>
            <Link
              href="/register"
              className="mt-3 inline-flex items-center justify-center rounded-full border border-sky-200/60 px-5 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-200 hover:bg-sky-200/10"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-slate-950/60">
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <p className="mt-2 text-sm text-slate-300/80">
            Use your username and password to continue.
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-rose-400/60 bg-rose-500/15 px-3 py-2 text-sm text-rose-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-sky-300/90 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-4 text-xs text-slate-400">
            By continuing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
