const express = require('express');
const pool = require('../config/database');

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;
        
        
        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        
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