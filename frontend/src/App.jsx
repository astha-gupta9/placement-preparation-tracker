import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Problems from "./pages/Problems";

function App() {
  // return (
  //   <Router>
  //     <Navbar />
  //     <Routes>
  //       <Route path="/" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
  //       <Route path="/problems" element={<PrivateRoute><Problems /></PrivateRoute>} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/register" element={<Register />} />
  //     </Routes>
  //   </Router>
  // );

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">
        Hello Tailwind!
      </h1>
    </div>
  );
}

export default App;