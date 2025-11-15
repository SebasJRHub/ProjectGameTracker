import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      <div className="home-content">
        <h1 className="neon-title">Bienvenido a <span className="highlight">GameZone</span></h1>
        <p className="neon-subtitle">Tu lugar para guardar y calificar tus juegos</p>
        <button className="btn-comenzar" onClick={() => navigate("/bibliotecaJuegos")}>
          Comenzar
        </button>
      </div>
    </div>
  );
}

export default Home;
