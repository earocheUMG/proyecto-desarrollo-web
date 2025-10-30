const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const router = express.Router();

// Middleware para verificar token
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};

// Registro
router.post('/registro', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Validaciones básicas
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
        }

        // Verificar si el usuario existe
        const usuarioExistente = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar usuario
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email',
            [nombre, email, hashedPassword]
        );

        // Generar token
        const token = jwt.sign(
            { userId: nuevoUsuario.rows[0].id },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            usuario: nuevoUsuario.rows[0] 
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validaciones básicas
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        // Verificar usuario
        const usuario = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (usuario.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Verificar password
        const passwordValido = await bcrypt.compare(password, usuario.rows[0].password);
        if (!passwordValido) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Generar token
        const token = jwt.sign(
            { userId: usuario.rows[0].id },
            process.env.JWT_SECRET || 'secreto',
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            usuario: { 
                id: usuario.rows[0].id, 
                nombre: usuario.rows[0].nombre, 
                email: usuario.rows[0].email 
            } 
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Verificar token
router.get('/verificar', verificarToken, (req, res) => {
    res.json({ mensaje: 'Token válido', usuario: req.usuario });
});

module.exports = router;