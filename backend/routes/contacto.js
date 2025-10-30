const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Enviar mensaje de contacto
router.post('/', async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        
        // Validaciones básicas
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        // Insertar mensaje en la base de datos
        const nuevoMensaje = await pool.query(
            'INSERT INTO contactos (nombre, email, mensaje) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, mensaje]
        );

        res.status(201).json({ 
            mensaje: 'Mensaje enviado correctamente',
            data: nuevoMensaje.rows[0]
        });
    } catch (error) {
        console.error('Error al enviar mensaje:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;