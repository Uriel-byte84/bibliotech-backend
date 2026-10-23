const API_URL = "http://localhost:3000/api";

// Elementos DOM
const authCard = document.getElementById("authCard");
const mainDashboard = document.getElementById("mainDashboard");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authAlert = document.getElementById("authAlert");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");
const userInfo = document.getElementById("userInfo");
const uploadSection = document.getElementById("uploadSection");
const uploadForm = document.getElementById("uploadForm");
const uploadAlert = document.getElementById("uploadAlert");
const materialsTableBody = document.getElementById("materialsTableBody");

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (token && user) showDashboard(user);
});

// Cambiar entre Login y Registro
function toggleAuth(mode) {
  authAlert.classList.add("hidden");
  if (mode === "login") {
    tabLogin.classList.add("tab-active");
    tabRegister.classList.remove("tab-active");
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  } else {
    tabRegister.classList.add("tab-active");
    tabLogin.classList.remove("tab-active");
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
}

function showAlert(element, message, type = "error") {
  element.textContent = message;
  element.className = `alert alert-${type} mt-4 text-sm py-2`;
  element.classList.remove("hidden");
}

// Registro
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Error al registrar");

    showAlert(authAlert, "¡Usuario creado! Ahora inicia sesión.", "success");
    registerForm.reset();
    setTimeout(() => toggleAuth("login"), 2000);
  } catch (err) {
    // Mostramos el mensaje exacto que viene del Filtro de Validación del backend
    const errorMsg = err.errors ? err.errors.join(", ") : err.message;
    showAlert(authAlert, errorMsg, "error");
  }
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.errors ? data.errors.join(", ") : data.message;
      throw new Error(errorMsg || "Credenciales inválidas");
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    showDashboard(data.user);
  } catch (err) {
    showAlert(authAlert, err.message, "error");
  }
});

function showDashboard(user) {
  authCard.classList.add("hidden");
  mainDashboard.classList.remove("hidden");
  userInfo.innerHTML = `
        <span class="badge badge-primary">${user.role}</span>
        <span class="font-bold">${user.name}</span>
        <button onclick="logout()" class="btn btn-outline btn-error btn-sm">Salir</button>
    `;
  if (user.role === "Professor" || user.role === "Admin")
    uploadSection.classList.remove("hidden");
  loadMaterials();
}

function logout() {
  localStorage.clear();
  authCard.classList.remove("hidden");
  mainDashboard.classList.add("hidden");
  userInfo.innerHTML = "";
  uploadSection.classList.add("hidden");
  loginForm.reset();
}

// Cargar y subir materiales
async function loadMaterials() {
  try {
    const res = await fetch(`${API_URL}/materials`);
    const materials = await res.json();
    materialsTableBody.innerHTML =
      materials.length === 0
        ? `<tr><td colspan="4" class="text-center opacity-50">Sin materiales.</td></tr>`
        : materials
            .map(
              (mat) => `
                <tr>
                    <td class="font-bold">${mat.title}</td>
                    <td>${mat.description || "-"}</td>
                    <td><span class="badge badge-ghost">${mat.author}</span></td>
                    <td><a href="http://localhost:3000/${mat.file_path}" target="_blank" class="btn btn-sm btn-accent">Descargar</a></td>
                </tr>`,
            )
            .join("");
  } catch (err) {
    console.error("Error:", err);
  }
}

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", document.getElementById("docTitle").value);
  formData.append("description", document.getElementById("docDesc").value);
  formData.append("file", document.getElementById("docFile").files[0]);

  try {
    const res = await fetch(`${API_URL}/materials/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Error al subir el archivo");

    showAlert(uploadAlert, "¡Archivo publicado!", "success");
    uploadForm.reset();
    loadMaterials();
  } catch (err) {
    showAlert(uploadAlert, err.message, "error");
  }
});
