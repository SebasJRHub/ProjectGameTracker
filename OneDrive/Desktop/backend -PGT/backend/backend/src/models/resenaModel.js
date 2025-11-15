
import mongoose from 'mongoose';
const { Schema } = mongoose;
const resenaSchema = new mongoose.Schema({
    juego: {
        type: Schema.Types.ObjectId,
        ref: "Juego",
        required: true
    },
    puntuacion: {
        type: Number,
        required: [true, 'La puntuación es obligatoria'],
        min: 1,
        max: 5
    },
    textoResena: {
        type: String,
        required: [true, 'El texto de la reseña es obligatorio'],
        trim: true
    },
    horasJugadas: {
        type: Number,
        required: [true, 'Las horas jugadas son obligatorias'],
        min: 0
    },
    dificultad: {
        type: String,
        enum: ["Fácil", "Media", "Difícil"],
        required: [true, 'La dificultad es obligatoria']
    },
    recomendaria: {
        type: Boolean
    }

}, {
    timestamps: true
}
);
export const Resena = mongoose.model('Resena', resenaSchema);