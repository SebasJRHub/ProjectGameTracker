import express from 'express';
import mongoose from 'mongoose';
import juegoRutas from './src/routes/juegoRoutes.js';
import resenaRutas from './src/routes/resenaRoutes.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import { verifyToken } from './src/middleware/authMiddleware.js';
dotenv.config();
import cors from "cors";


const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // o '*' si quieres permitir todos los orígenes
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(MONGODB_URL).then(() => {
  console.log("Conectado a la base de datos MongoDB");
}).catch((error) => {
  console.error("Error al conectar a la base de datos MongoDB:", error);
});
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use(verifyToken);
app.use('/api/resenas', resenaRutas);
app.use('/api/juegos', juegoRutas);

 

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});