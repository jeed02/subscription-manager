import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, User, UserPreferences } from "../types/auth";
import { getPreferences, getProfile } from "./authService";

interface ExtendedAuthContextType extends AuthContextType {
    preferences: UserPreferences | null;
    refreshUser: () => Promise<void>;
    refreshPreferences: () => Promise<void>;
}

const AuthContext = createContext<ExtendedAuthContextType | undefined>(
    undefined,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [preferences, setPreferences] = useState<UserPreferences | null>(
        null,
    );

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            refreshUser();
            refreshPreferences();
        }
    }, []);

    useEffect(() => {
        const root = document.documentElement;
        if (preferences?.theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [preferences?.theme]);

    const refreshUser = async () => {
        try {
            const userData = await getProfile();
            setUser(userData);
        } catch (error) {
            console.error("Failed to refresh user:", error);
            logout();
        }
    };

    const refreshPreferences = async () => {
        try {
            const prefs = await getPreferences();
            setPreferences(prefs);
        } catch (error) {
            console.error("Failed to refresh preferences:", error);
        }
    };

    const login = (jwt: string) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
        refreshUser();
        refreshPreferences();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setPreferences(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                preferences,
                login,
                logout,
                refreshUser,
                refreshPreferences,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
};
