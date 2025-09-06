import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", { username, email, password });
            
            console.log("Backend Response:", res.data);
            
            login(res.data);
            navigate("/");
        } catch (err) {
            console.error("Error:", err);
            alert(err.response?.data?.message || "Registeration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 outline-none" />
                    <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Register</button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;