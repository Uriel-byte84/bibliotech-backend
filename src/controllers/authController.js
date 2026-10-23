const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUserId = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "Usuario registrado", userId: newUserId });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "secreto_bibliotech",
      { expiresIn: "8h" },
    );
    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: { id: user.id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = { register, login };
