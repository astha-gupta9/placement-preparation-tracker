import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md rounded-2xl mx-6 my-4 px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-extrabold text-gray-800">
                Track<span className="text-blue-600">Mate</span>
            </Link>

            <div className="flex items-center gap-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">Dashboard</Link>
                <Link to="/problems" className="text-gray-600 hover:text-blue-600 font-medium transition">Problems</Link>
            {user ? (
                <button onClick={ handleLogout } className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">Logout</button>
            ) : (
                <>
                    <Link to="/login" className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition">Login</Link>
                    <Link to="/register" className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">Register</Link>
                </>
            )}
            </div>
        </nav>
    );
}

export default Navbar;