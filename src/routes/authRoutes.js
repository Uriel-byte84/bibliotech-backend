const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateAuth } = require("../filters/authFilter"); // Importamos el filtro

// Interceptamos la petición con validateAuth antes de llegar al controlador
router.post("/register", validateAuth, authController.register);
router.post("/login", validateAuth, authController.login);

module.exports = router;
