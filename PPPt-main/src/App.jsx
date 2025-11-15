import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Biblioteca from "./components/BibliotecaJuegos";
import Register from "./pages/Register";
import Reseñas from "./pages/Reseñas";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/resenas/:juegoId" element={<ProtectedRoute><Reseñas /></ProtectedRoute>} />
        <Route path="/bibliotecaJuegos" element={<ProtectedRoute><Biblioteca /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
