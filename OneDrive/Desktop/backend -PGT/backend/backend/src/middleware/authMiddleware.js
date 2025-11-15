import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
      return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET || "clave-secreta");
    req.usuario = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: "Token inválido o expirado." });
  }
};
