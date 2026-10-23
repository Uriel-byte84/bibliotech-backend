const validateAuth = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Expresión regular para verificar si tiene formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    errors.push("El formato del email no es válido.");
  }

  if (!password || password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres.");
  }

  // Si hay errores, frenamos la petición aquí mismo y devolvemos un 400
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Error de validación (Filtro)",
      errors,
    });
  }

  // Si todo está correcto, dejamos pasar la petición al controlador
  next();
};

module.exports = { validateAuth };
