import { Resena as resenaModel } from '../models/resenaModel.js';

const crearResena = async (req, res) => {
    try {
        const nuevaResena = new resenaModel(req.body);
        await nuevaResena.save();
        res.status(201).json(nuevaResena);
    } catch (error) {
        console.error("ERROR CREAR RESEÑA:", error);
        res.status(500).json({
            error: "No se pudo crear la reseña",
            details: error.message
        });
    }
};

const obtenerResenas = async (req, res) => {
    try {
        const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};
        const resenas = await resenaModel
            .find(filtro)
            .populate("juego", "nombre");  // ← corregido

        res.status(200).json(resenas);
    } catch (error) {
        console.error("ERROR OBTENER RESEÑAS:", error);
        res.status(500).json({
            error: "No se pudo obtener ninguna reseña",
            details: error.message
        });
    }
};

const obtenerResenasPorJuego = async (req, res) => {
    try {
        const { juegoId } = req.params;
        const resenas = await resenaModel
            .find({ juego: juegoId })
            .populate("juego", "nombre");

        res.status(200).json(resenas);
    } catch (error) {
        console.error("ERROR OBTENER POR JUEGO:", error);
        res.status(500).json({
            error: "Error al obtener reseñas del juego.",
            details: error.message
        });
    }
};

const actualizarResena = async (req, res) => {
    try {
        const { id } = req.params;
        const resena = await resenaModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!resena) {
            return res.status(404).json({ msg: "No se encontró la reseña" });
        }

        res.json(resena);
    } catch (error) {
        res.status(500).json({
            error: "No se pudo actualizar la reseña",
            details: error.message
        });
    }
};

const eliminarResena = async (req, res) => {
    try {
        const { id } = req.params;
        const resena = await resenaModel.findById(id);

        if (!resena) {
            return res.status(404).json({ msg: "Reseña no encontrada para eliminarse" });
        }

        await resenaModel.findByIdAndDelete(id);

        res.status(200).json({ msg: "Reseña eliminada con éxito" });
    } catch (error) {
        console.error("ERROR ELIMINAR:", error);
        res.status(500).json({
            error: "No se pudo eliminar la reseña",
            details: error.message
        });
    }
};

export default {
    crearResena,
    obtenerResenas,
    obtenerResenasPorJuego,
    actualizarResena,
    eliminarResena
};
