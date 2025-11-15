import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        length: [4, 'El nombre de usuario debe tener al menos 4 caracteres']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    }

});

export const Usuario = mongoose.model("Usuario", userSchema);  