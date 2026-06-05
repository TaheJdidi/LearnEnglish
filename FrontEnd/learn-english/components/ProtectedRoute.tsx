"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = useAuth();
    const router = useRouter();

    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setIsChecking(false);

        if (!token) {
            router.replace("/login");
        }
    }, [token, router]);

    // IMPORTANT: wait until client hydration is done
    if (isChecking) {
        return null; // or a loader
    }

    if (!token) {
        return null;
    }

    return <>{children}</>;
}