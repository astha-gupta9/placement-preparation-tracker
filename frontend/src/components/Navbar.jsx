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
        <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
            <Link to="/">Dashboard</Link>
            <Link to="/problems">Problems</Link>

            {user ? (
                <>
                    <span>Hi, { user.username }</span>
                    <button onClick={ handleLogout }>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;