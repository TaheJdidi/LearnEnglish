"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";
export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    console.log("Registering with:", { fullName, email, password });
    try {
      const result = await register({
        fullName,
        email,
        password,
      });

      localStorage.setItem("refreshToken", result.refreshToken);
      login(result.accessToken);
      router.push("/home");
      console.log(result);
    } catch (err: unknown) {
      setError((err as Error)?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top,_#1f2937,_#0b1220_45%,_#05070b_100%)] px-4 py-10 text-slate-100">
      <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl backdrop-blur-2xl">
        <div className="relative p-8 md:p-12 bg-gradient-to-br from-amber-400/15 via-transparent to-teal-400/15">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-200/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-amber-100">
            Welcome
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl font-semibold tracking-tight">
            Start learning with a focused, friendly workspace.
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-200/80 leading-relaxed">
            Build habits with short daily sessions, curated lessons, and a calm dashboard that keeps you moving.
          </p>
          <div className="mt-8 space-y-3 text-sm text-slate-200/80">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span>Track progress with weekly highlights.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              <span>Save your vocabulary lists across devices.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-sky-300" />
              <span>Keep momentum with gentle reminders.</span>
            </div>
          </div>
          <div className="mt-10 rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <p className="text-sm text-slate-200/70">Already have an account?</p>
            <Link
              href="/login"
              className="mt-3 inline-flex items-center justify-center rounded-full border border-amber-200/60 px-5 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-200/10"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-slate-950/60">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="mt-2 text-sm text-slate-300/80">
            Join in less than a minute and save your progress.
          </p>

          {error && (
            <div className="mt-6 rounded-lg border border-rose-400/60 bg-rose-500/15 px-3 py-2 text-sm text-rose-100">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Full Name
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Email
              </label>
              <input
                type="email"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Password
              </label>
              <input
                type="password"
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            //disabled={loading}
            className="mt-6 w-full rounded-xl bg-amber-300/90 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
          <p className="mt-4 text-xs text-slate-400">
            By continuing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}