import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario as userModel } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET || "clave-secreta",
      { expiresIn: "2h" }
    );

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo registrar el usuario" });
  }
};



export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }


    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "clave-secreta", 
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo iniciar sesión" });
  }
};
