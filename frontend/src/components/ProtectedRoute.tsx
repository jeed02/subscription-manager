import { Navigate } from "react-router-dom"
import { useAuth } from "../services/AuthContext.tsx"
import type {JSX} from "react";

export default function ProtectedRoute({
                                           children,
                                       }: {
    children: JSX.Element
}) {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/" />
    }

    return children
}
