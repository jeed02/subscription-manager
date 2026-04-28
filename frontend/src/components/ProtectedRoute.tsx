import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext.tsx";

export default function ProtectedRoute({
    children,
}: {
    children: JSX.Element;
}) {
    const { token, isInitialized } = useAuth();

    if (!isInitialized) {
        return null;
    }

    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
}
