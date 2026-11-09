import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/usuarioRepository.js';
import { UsuarioValidator } from '../validators/usuarioValidator.js';

const usuarioRepo = new UsuarioRepository();

export class AuthController {
    async registrar(req, res) {
        try {
            const { nombre, email, password, rol } = req.body;

            const errorValidacion = UsuarioValidator.validarRegistro(nombre, email, password);
            if (errorValidacion) {
                return res.status(400).json({ error: errorValidacion });
            }

            const existe = await usuarioRepo.buscarPorEmail(email);
            if (existe) {
                return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await usuarioRepo.crear(nombre, email, hashedPassword, rol || 'student');

            res.status(201).json({ mensaje: '¡Usuario registrado con éxito!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const usuario = await usuarioRepo.buscarPorEmail(email);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado.' });
            }

            const passwordMatch = await bcrypt.compare(password, usuario.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Contraseña incorrecta.' });
            }

            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol, email: usuario.email },
                process.env.JWT_SECRET || 'secreto',
                { expiresIn: '1h' }
            );

            res.json({ mensaje: 'Login exitoso', token, rol: usuario.rol });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}