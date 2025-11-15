import express from "express";
import juegoController from '../controllers/juegoController.js';
const router = express.Router();

router.post('/crearJuego', juegoController.crearJuego );
router.get('/obtenerJuegos', juegoController.obtenerJuegos);
router.get('/obtenerJuego/:id', juegoController.obtenerJuegoPorId);
router.put('/editarJuego/:id', juegoController.actualizarJuego);
router.delete('/eliminarJuego/:id',juegoController.eliminarJuego);

export default router;