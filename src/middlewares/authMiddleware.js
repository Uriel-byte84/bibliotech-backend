const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Falta el token." });
  try {
    const token = authHeader.split(" ")[1] || authHeader;
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secreto_bibliotech",
    );
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token expirado o no válido." });
  }
};

const isProfessorOrAdmin = (req, res, next) => {
  if (req.user.role === "Professor" || req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Solo Profesores pueden subir material." });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") next();
  else res.status(403).json({ message: "Acción solo para Administradores." });
};

module.exports = { verifyToken, isProfessorOrAdmin, isAdmin };
