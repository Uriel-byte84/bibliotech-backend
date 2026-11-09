# 🚀 BiblioCore (Backend)

> Sistema de gestión de backend robusto y escalable para la administración de bibliotecas y catálogos de libros.

[![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-blue.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-Framework-lightgrey.svg)](https://expressjs.com/)
[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange.svg)]()

---

## 📋 Tabla de Contenidos
- [📖 Sobre el Proyecto](#-sobre-el-proyecto)
- [✨ Características Principales](#-características-principales)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [⚙️ Requisitos Previos y Configuración](#️-requisitos-previos-y-configuración)
- [🚀 Instalación y Ejecución](#-instalación-y-ejecución)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠️ Variables de Entorno](#️-variables-de-entorno)
- [📌 Endpoints de la API](#-endpoints-de-la-api)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

---

## 📖 Sobre el Proyecto

**BiblioCore** es una API de backend desarrollada con Node.js y Express diseñada para cubrir todas las necesidades de gestión de una biblioteca moderna. Permite el control de usuarios, autenticación segura mediante tokens, gestión de inventario de libros y procesamiento de subida de archivos e imágenes.

---

## ✨ Características Principales

* **Autenticación Segura:** Registro e inicio de sesión de usuarios protegidos con JWT (JSON Web Tokens) y contraseñas cifradas con `bcrypt`.
* **Gestión de Libros:** Operaciones CRUD completas para administrar el catálogo literario.
* **Subida de Archivos:** Middleware personalizado para la gestión y carga de imágenes o archivos asociados a los registros.
* **Validación de Datos:** Capas de validación estrictas para asegurar la integridad de la información ingresada por los usuarios.
* **Conexión a Base de Datos:** Interfaz optimizada mediante repositorios utilizando `mysql2`.

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework Web:** [Express.js](https://expressjs.com/)
* **Base de Datos:** [MySQL](https://www.mysql.com/) (`mysql2`)
* **Seguridad y Auth:** `jsonwebtoken`, `bcrypt`
* **Manejo de Archivos:** `multer`

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu computadora:
* [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada).
* Un servidor de base de datos MySQL activo (como XAMPP, Workbench o Docker).
* Un cliente de API como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar los endpoints.

---

## 🚀 Instalación y Ejecución

Sigue estos pasos para clonar y poner en marcha el proyecto de forma local:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/Uriel-byte84/bibliotech-backend.git](https://github.com/Uriel-byte84/bibliotech-backend.git)
   bibliotech-backend/
│
├── public/                 # Archivos estáticos o recursos públicos
├── src/
│   ├── config/             # Configuración de base de datos y servicios
│   ├── controllers/        # Lógica de negocio de cada ruta
│   ├── middlewares/        # Validaciones de sesión, subida de archivos, etc.
│   ├── repositories/       # Consultas directas a la base de datos
│   ├── routes/             # Definición de endpoints de la API
│   ├── validators/         # Esquemas y reglas de validación de datos
│   └── app.js              # Archivo principal de configuración de Express
│
├── .gitignore              # Archivos ignorados por Git
├── package.json            # Dependencias y scripts del proyecto
└── package-lock.json