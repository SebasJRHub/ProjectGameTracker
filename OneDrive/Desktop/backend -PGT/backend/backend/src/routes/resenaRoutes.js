import express from "express"
import resenaController from '../controllers/resenaController.js';
const router  = express.Router();

router.post('/crearResena', resenaController.crearResena);
router.get('/obtenerResenas', resenaController.obtenerResenas);
router.get('/obtenerResenasPorJuego/:juegoId', resenaController.obtenerResenasPorJuego);
router.put('/editarResena/:id', resenaController.actualizarResena);
router.delete('/eliminarResena/:id', resenaController.eliminarResena);

export default router;