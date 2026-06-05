"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";


export default function ChatPage() {
    const { logout, token } = useAuth();
const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, newMessage]);

    setInput("");

    // later we will call backend here
  };

  return (
     <ProtectedRoute>
<div className="min-h-screen bg-slate-950 text-white p-6 flex flex-col">
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
      {/* CHAT AREA */}
      <div className="flex-1 space-y-3 overflow-auto">
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-2 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-4 py-2"
        >
          Send
        </button>
      </div>

    </div>
     </ProtectedRoute>
    
  );
}