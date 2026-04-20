import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await register({ email, password });

            localStorage.setItem("token", response.token);

            navigate("/dashboard");
        } catch (err) {
            alert("Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-linear-to-bl from-main-10 to-main-20 dark:from-main-900 dark:to-main-950">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-main-800 p-8 rounded-xl shadow-md w-96"
            >
                <h1 className="text-xl mb-6 text-center dark:text-main-100">
                    Create account
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 dark:placeholder-main-400 p-2 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 dark:border-main-600 dark:bg-main-700 dark:text-main-100 dark:placeholder-main-400 p-2 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full rounded-full bg-main-400 text-white py-2 rounded hover:bg-main-600">
                    Sign Up
                </button>

                <p className="mt-4 text-sm text-center dark:text-main-300">
                    Already have an account?{" "}
                    <Link to="/" className="text-main-400">
                        Sign in
                    </Link>
                </p>
            </form>
        </div>
    );
}
