const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

// Forzar la ruta absoluta a la carpeta public
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Bibliotech corriendo en el puerto ${PORT}`);
});
