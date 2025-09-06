import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout({ children }) {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="px-6 py-4 text-xl font-bold border-b">TrackMate</div>
                <nav className="flex-1 px-4 py-6 space-y-4">
                    <Link to="/" className="block py-2 px-3 rounded-lg hover:bg-gray-200 transition">Dashboard</Link>
                    <Link to="/problems" className="block py-2 px-3 rounded-lg hover:bg-gray-200 transition">Problems</Link>
                    <Link to="/profile" className="block py-2 px-3 rounded-lg hover:bg-gray-200 transition">Profile</Link>
                </nav>
                <button onClick={handleLogout} className="m-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Logout</button>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Placement Preparation Tracker</h1>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-600">Welcome 👋</span>
                        <img src="https://via.placeholder.com/40" alt="avatar" className="w-10 h-10 rounded-full"/>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}

export default Layout;