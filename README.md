
# 📚 Bibliotech - Sistema de Gestión Académica

Bibliotech es un sistema web para la gestión y publicación de materiales académicos. Diseñado bajo una **Arquitectura en Capas** sólida, implementa patrones de diseño clave y una separación clara entre el Frontend y el Backend.

---

## 🛠️ Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** MariaDB (vía Laragon)
- **Frontend:** HTML5, JavaScript (ES6+), Tailwind CSS, DaisyUI
- **Seguridad y Archivos:** JWT (JSON Web Tokens), BCrypt, Multer

---

## 🏗️ Patrones de Diseño y Arquitectura Aplicados

### 1. Patrón Repository (Patrón Repositorio)
- **Ubicación:** src/repositories/
- **Propósito:** Abstrae la capa de acceso a datos. Los controladores no ejecutan consultas SQL directamente, aislando MariaDB de la lógica de negocio.

### 2. Arquitectura en Capas (Layered Architecture)
- src/routes/: Definición de endpoints API REST.
- src/controllers/: Manejo de la lógica de negocio.
- src/repositories/: Gestión de consultas a la base de datos.
- src/middlewares/: Verificación de tokens JWT y subida de archivos (Multer).
- src/filters/: Validación de formato de entrada.
- public/: Interfaz de usuario totalmente desacoplada.

### 3. Patrón Middleware (Cadena de Responsabilidad)
Intercepta las peticiones HTTP para autenticación por roles (**Admin**, **Professor**, **Student**) y procesamiento de archivos PDF.

---

## 🚀 Instalación Local

1. Clonar el repositorio y entrar a la carpeta:
   git clone https://github.com/Uriel-byte84/bibliotech-backend.git
2. Instalar dependencias: 
pm install
3. Iniciar MariaDB y configurar .env.
4. Ejecutar la base de datos: 
ode setupDB.js
5. Levantar el servidor: 
ode src/app.js

