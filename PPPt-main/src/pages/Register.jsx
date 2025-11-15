import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar el usuario");
      }

      console.log("Usuario registrado:", data);
      alert("Registro exitoso ");

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Token guardado tras registro:", data.token);
        navigate("/bibliotecaJuegos");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert(error.message || "Hubo un error al registrarte. Intenta nuevamente.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrarse</button>
        </form>

        <p className="login-link">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="link-text">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
