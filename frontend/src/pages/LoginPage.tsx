import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from "../services/AuthContext.tsx";


export default function LoginPage() {
    const navigate = useNavigate();

    const { login: authLogin } = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await login({ email, password })

            authLogin(response.token)

            navigate("/dashboard");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-linear-to-bl from-main-10 to-main-20">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-md w-96"
            >
                <h1 className="text-xl mb-6 text-center">
                    Welcome back
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-full rounded-full bg-main-400 text-white py-2 rounded hover:bg-main-600"
                >
                    Sign In
                </button>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-main-400">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}
