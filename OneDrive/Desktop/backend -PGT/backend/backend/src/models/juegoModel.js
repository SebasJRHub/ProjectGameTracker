import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema(
  {
  titulo:{ 
    type : String,
    required : [true, 'El título es obligatorio'],
    trim: true,
  },
  genero:{ 
    type: String,
    required: [true, 'El género es obligatorio']
  },
  plataforma: {
    type : String,
    required : [true,'La plataforma es obligatoria']
  },
  anioLanzamiento: {
    type : Number,
    required : [true,'El año de lanzamiento es obligatorio']
  },
  desarrollador: {
    type : String
  },
  imagenPortada: {
    type : String,
    required : [true,'La imagen de portada es obligatoria']
  }, 
  descripcion: {
    type : String,
  },
  completado: {
    type : Boolean,
    default : false
  },
  fechaCreacion: {
    type : Date
  },
  usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", 
      required: true,
    },
},
  {timestamps: true}
);

export const Juego = mongoose.model("Juego", juegoSchema);