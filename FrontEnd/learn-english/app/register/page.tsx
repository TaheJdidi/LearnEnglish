"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await register({
        fullName,
        email,
        password,
      });

      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      router.push("/home");
      console.log(result);
    } catch (err: unknown) {
      setError((err as Error)?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 text-white">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Create account
        </h1>
        <p className="text-center text-sm text-gray-300 mb-6">
          Join us and start your journey
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-200 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Full Name</label>
          <input
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition font-semibold disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}