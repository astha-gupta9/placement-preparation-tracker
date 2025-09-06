import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data);
            navigate("/");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Login</button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;