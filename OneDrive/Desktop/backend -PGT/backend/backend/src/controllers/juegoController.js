
import { Juego as juegoModel } from '../models/juegoModel.js';

//Crear
export const crearJuego = async (req, res) => {
    try {
        const nuevoJuego = new juegoModel({...req.body, usuario: req.usuario.id});
        await nuevoJuego.save();
        res.status(201).json(nuevoJuego);
        
    } catch (error) {
        console.error("Error al crear el juego:", error);
        res.status(400).json({
            error: "Error de campos invalidos. Porfavor verifique sus datos",
            details: error.message
        })
    }
}
//Obtener todos
export const obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juegoModel.find({usuario: req.usuario.id});
        res.status(201).json(juegos);
    } catch (error) {
        res.status(500).json({
            error: "Error de servidor, no se encontraron los juegos",
            details: error.message
        })
    }
}
//Obtener por id
export const obtenerJuegoPorId = async (req, res) => {
    try {
        const juego = await juegoModel.findById(req.params.id);
        if (!juego) {
            return res.status(404).json({
                msg: "No se puedo encontrar el juego",
            })
        }
        res.status(200).json(juego);
    } catch (error) {
        res.status(500).json({
            error: "Hubo error en el servidor",
            details: error.message
        })
    }
}
//Actualizar 
export const actualizarJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const juego = await juegoModel.findOneAndUpdate( 
            { _id: id, usuario: req.usuario.id },
            req.body, 
            {new: true, runValidators: true });
        if (!juego) {
            res.status(404).json({
                msg: "Juego no encontrado"
            })
        }
        res.status(200).json(juego)
    } catch (error) {
        res.status(500).json({
            error: "Error al actualizar el juego",
            details: error.message
        })
    }
}
//Eliminar
export const eliminarJuego = async (req, res) => {
    try{ 
        const { id } = req.params;
        const juego = await juegoModel.findOneAndDelete( { _id: id, usuario: req.usuario.id });
        if (!juego) {
            return res.status(404).json({ msg: "juego no encontrado para eliminarse" })
        }
        res.status(200).json({msg : "Juego eliminado exitosamente"})
    }catch(error){
        res.status(500).json({error : "Ocurrio un error y no se pudo eliminar el juego"})
    }
}

export default {
    crearJuego,
    obtenerJuegos,
    obtenerJuegoPorId,
    actualizarJuego ,
    eliminarJuego 
}