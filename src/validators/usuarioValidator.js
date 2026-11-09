export class UsuarioValidator {
    static validarRegistro(nombre, email, password) {
        if (!nombre || nombre.trim().length < 2) {
            return "El nombre es obligatorio y debe tener al menos 2 caracteres.";
        }
        
        // Filtro de formato de correo electrónico mediante expresión regular
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !regexEmail.test(email)) {
            return "El formato del correo electrónico no es válido.";
        }

        if (!password || password.length < 6) {
            return "La contraseña debe tener al menos 6 caracteres.";
        }

        return null; // Todo OK
    }
}