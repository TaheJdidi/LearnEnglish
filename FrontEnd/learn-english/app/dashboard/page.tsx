"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DashboardPage() {
  const { logout, token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const startInterview = async () => {
    setLoading(true);

    try {
      // later we will call backend:
      // POST /api/sessions

      router.push("/sessions/job-interview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-slate-400">
              Welcome back 👋
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-300">
              {token ? "Logged in" : "Guest"}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-2">
              🎤 Job Interview Practice
            </h2>

            <p className="text-sm text-slate-400 mb-4">
              Simulate real interview conversations with AI.
            </p>

            <button
              onClick={startInterview}
              disabled={loading}
              className="px-5 py-3 bg-emerald-500 text-black rounded-lg font-semibold"
            >
              {loading ? "Starting..." : "Start Interview"}
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-xl font-semibold mb-2">
              📊 Your Progress
            </h2>

            <div className="text-sm text-slate-400 space-y-2">
              <p>Sessions: 0</p>
              <p>Practice time (7 days): 0 min</p>
              <p>🔥 Streak: 0 days</p>
              <p>Last activity: never</p>
            </div>
          </div>

        </div>

        {/* RECENT SESSIONS */}
        <div className="mt-8 bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-lg font-semibold mb-4">
            🧾 Recent Sessions
          </h2>

          <p className="text-sm text-slate-400">
            No sessions yet. Start your first interview 🚀
          </p>
        </div>

      </div>
    </ProtectedRoute>
  );
}