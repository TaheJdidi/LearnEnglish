"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { logoutApi } from "@/services/authService";

export default function DashboardPage() {

    const { logout } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        const RefreshToken = localStorage.getItem("refreshToken");
        logoutApi({ RefreshToken: RefreshToken || "" });
        logout();
        router.push("/login");
    };

    return (
        <ProtectedRoute>
            <div>
                <h1>Dashboard</h1>

                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Logout
                </button>
            </div>
        </ProtectedRoute>
    );
}