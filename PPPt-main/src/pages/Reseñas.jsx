import React, { useState, useEffect } from "react";
import "../Styles/Resenas.css";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BibliotecaResenas() {
  const { juegoId } = useParams();
  const [resenas, setResenas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [resenaActiva, setResenaActiva] = useState({
    _id: "",
    puntuacion: 1,
    textoResena: "",
    horasJugadas: 0,
    dificultad: "Fácil",
    recomendaria: false,
  });

  useEffect(() => {
    const fetchResenas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:3000/api/resenas/obtenerResenasPorJuego/${juegoId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Error al obtener reseñas");
        const data = await res.json();
        setResenas(data);
      } catch (err) {
        console.error("Error al cargar reseñas:", err);
      }
    };
    fetchResenas();
  }, [juegoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResenaActiva({
      ...resenaActiva,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const url = isEditing
        ? `http://localhost:3000/api/resenas/editarResena/${resenaActiva._id}`
        : `http://localhost:3000/api/resenas/crearResena`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...resenaActiva, juego: juegoId }),
      });

      if (!response.ok) throw new Error("Error al guardar la reseña");
      const data = await response.json();

      if (isEditing) {
        setResenas((prev) =>
          prev.map((r) => (r._id === data._id ? data : r))
        );
        alert("Reseña actualizada ");
      } else {
        setResenas((prev) => [...prev, data]);
        alert("Reseña creada ");
      }

      setShowForm(false);
      setIsEditing(false);
      setResenaActiva({
        _id: "",
        puntuacion: 1,
        textoResena: "",
        horasJugadas: 0,
        dificultad: "Fácil",
        recomendaria: false,
      });
    } catch (error) {
      console.error(error);
      alert("Error al guardar la reseña");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta reseña?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/resenas/eliminarResena/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Error al eliminar reseña");
      setResenas((prev) => prev.filter((r) => r._id !== id));
      alert("Reseña eliminada ");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar reseña");
    }
  };

  const handleEditar = (resena) => {
    setResenaActiva(resena);
    setIsEditing(true);
    setShowForm(true);
  };

  return (
    <div className="resenas-container">
      <h1>Reseñas del Juego</h1>

      <button
        className="add-resena-btn"
        onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setResenaActiva({
            puntuacion: 1,
            textoResena: "",
            horasJugadas: 0,
            dificultad: "Fácil",
            recomendaria: false,
          });
        }}
      >
        Crear Reseña
      </button>

      <div className="resenas-grid">
        <AnimatePresence>
          {resenas.length > 0 ? (
            resenas.map((r) => (
              <motion.div
                key={r._id}
                className="resena-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="points">⭐ {r.puntuacion}</h3>
                <p className="resena-texto">{r.textoResena}</p>
                <p>Horas jugadas: {r.horasJugadas}</p>
                <p>Dificultad: {r.dificultad}</p>
                <p>Recomendaría: {r.recomendaria ? "Sí" : "No"}</p>
                <div className="resena-buttons">
                  <button onClick={() => handleEditar(r)}>Editar</button>
                  <button onClick={() => handleEliminar(r._id)}>Eliminar</button>
                </div>
              </motion.div>
            ))
          ) : (
            <p>No hay reseñas para este juego.</p>
          )}
        </AnimatePresence>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? "Editar Reseña" : "Agregar Reseña"}</h2>
            <form onSubmit={handleSubmit} className="add-resena-form">
              <input
                type="number"
                name="puntuacion"
                placeholder="Puntuación (1-5)"
                value={resenaActiva.puntuacion}
                min={1}
                max={5}
                onChange={handleChange}
                required
              />
              <textarea
                name="textoResena"
                placeholder="Texto de la reseña"
                value={resenaActiva.textoResena}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="horasJugadas"
                placeholder="Horas jugadas"
                value={resenaActiva.horasJugadas}
                min={0}
                onChange={handleChange}
                required
              />
              <select
                name="dificultad"
                value={resenaActiva.dificultad}
                onChange={handleChange}
                required
              >
                <option value="Fácil">Fácil</option>
                <option value="Media">Media</option>
                <option value="Difícil">Difícil</option>
              </select>
              <label>
                <input
                  type="checkbox"
                  name="recomendaria"
                  checked={resenaActiva.recomendaria}
                  onChange={handleChange}
                />
                ¿Recomendaría?
              </label>
              <div className="modal-buttons">
                <button type="submit">{isEditing ? "Guardar Cambios" : "Guardar"}</button>
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
