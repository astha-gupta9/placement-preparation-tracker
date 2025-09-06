import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Problems from "./pages/Problems";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <Layout> <Dashboard /> </Layout> </PrivateRoute>} />
        <Route path="/problems" element={<PrivateRoute> <Layout> <Problems /> </Layout> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;