import React, { useState, useEffect } from "react";
import "../styles/BibliotecaJuegos.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BibliotecaJuegos() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [juegos, setJuegos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/juegos/obtenerJuegos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener los juegos");
        const data = await res.json();
        setJuegos(data);
        console.log("🎮 Juegos cargados:", data);
      } catch (err) {
        console.error("Error al cargar los juegos:", err);
      }
    };
    fetchJuegos();
  }, []);

  const [newGame, setNewGame] = useState({
    _id: "",
    titulo: "",
    genero: "",
    plataforma: "",
    anioLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
    fechaCreacion: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGame({ ...newGame, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = isEditing
        ? `http://localhost:3000/api/juegos/editarJuego/${newGame._id}`
        : "http://localhost:3000/api/juegos/crearJuego";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newGame,
          _id: undefined,
          anioLanzamiento: Number(newGame.anioLanzamiento),
        }),
      });

      if (!response.ok) throw new Error("Error al guardar el juego");

      const data = await response.json();

      if (isEditing) {
        setJuegos((prev) => prev.map((j) => (j._id === data._id ? data : j)));
        alert("Juego actualizado ");
      } else {
        setJuegos((prev) => [...prev, data]);
        alert("Juego creado ");
      }

      setShowForm(false);
      setIsEditing(false);
      setNewGame({
        _id: "",
        titulo: "",
        genero: "",
        plataforma: "",
        anioLanzamiento: "",
        desarrollador: "",
        imagenPortada: "",
        descripcion: "",
        completado: false,
        fechaCreacion: "",
      });
    } catch (error) {
      console.error("Error al guardar juego:", error);
      alert("Error al guardar el juego");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este juego?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/juegos/eliminarJuego/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar juego");
      setJuegos((prev) => prev.filter((j) => j._id !== id));
      alert("Juego eliminado correctamente ");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el juego");
    }
  };

  const handleEdit = (game) => {
    setNewGame(game);
    setIsEditing(true);
    setShowForm(true);
  };

  const verResenasDelJuego = (juegoId) => {
    navigate(`/resenas/${juegoId}`);
  };

  return (
    <div className="library-container">
      <h1>Biblioteca de Juegos</h1>

      <button
        className="add-game-btn"
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setNewGame({
            _id: "",
            titulo: "",
            genero: "",
            plataforma: "",
            anioLanzamiento: "",
            desarrollador: "",
            imagenPortada: "",
            descripcion: "",
            completado: false,
            fechaCreacion: "",
          });
        }}
      >
         Agregar Juego
      </button>

      <div className="game-grid">
        <AnimatePresence>
          {juegos.length > 0 ? (
            juegos.map((game) => (
              <motion.div
                key={game._id}
                className="game-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <img src={game.imagenPortada} alt={game.titulo} />
                <h3>{game.titulo}</h3>
                <p className="genre">{game.genero}</p>
                <p className="description">{game.descripcion}</p>
                <div className="buttons">
                  <button onClick={() => verResenasDelJuego(game._id)}>Ver reseñas</button>
                  <button onClick={() => handleEdit(game)}>Editar</button>
                  <button onClick={() => handleDelete(game._id)}>Eliminar</button>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No hay juegos en la biblioteca aún.</p>
          )}
        </AnimatePresence>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Editar Juego" : "Agregar Nuevo Juego"}</h2>
            <form onSubmit={handleSubmit} className="add-game-form">
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={newGame.titulo}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={newGame.genero}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="plataforma"
                placeholder="Plataforma"
                value={newGame.plataforma}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="anioLanzamiento"
                placeholder="Año de lanzamiento"
                value={newGame.anioLanzamiento}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="desarrollador"
                placeholder="Desarrollador"
                value={newGame.desarrollador}
                onChange={handleChange}
              />
              <input
                type="text"
                name="imagenPortada"
                placeholder="URL de imagen"
                value={newGame.imagenPortada}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={newGame.descripcion}
                onChange={handleChange}
              />
              <label>
                <input
                  type="checkbox"
                  name="completado"
                  checked={newGame.completado}
                  onChange={handleChange}
                />
                ¿Completado?
              </label>
              <input
                type="date"
                name="fechaCreacion"
                value={newGame.fechaCreacion}
                onChange={handleChange}
              />
              <div className="modal-buttons">
                <button type="submit">
                  {isEditing ? "Guardar Cambios" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
