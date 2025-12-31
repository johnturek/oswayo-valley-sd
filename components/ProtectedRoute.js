"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return <>{children}</>;
}
