import { createContext, useContext, useState, useEffect } from "react"
import type { AuthContextType, User } from "../types/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)

            // Optional: decode JWT later
            setUser({ id: "temp", email: "user@email.com" })
        }
    }, [])

    const login = (jwt: string) => {
        localStorage.setItem("token", jwt)
        setToken(jwt)

        // Later we decode JWT
        setUser({ id: "temp", email: "user@email.com" })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context
}
