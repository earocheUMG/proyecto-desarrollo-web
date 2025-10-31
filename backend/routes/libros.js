const express = require('express');
const pool = require('../config/database');

const router = express.Router();


const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
    }

    try {
        const jwt = require('jsonwebtoken');
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto');
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token inválido.' });
    }
};

router.get('/', verificarToken, async (req, res) => {
    try {
        const libros = await pool.query(
            'SELECT * FROM libros WHERE usuario_id = $1 ORDER BY fecha_agregado DESC',
            [req.usuario.userId]
        );
        
        res.json(libros.rows);
    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await pool.query(
            'SELECT * FROM libros WHERE id = $1 AND usuario_id = $2',
            [id, req.usuario.userId]
        );
        
        if (libro.rows.length === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        
        res.json(libro.rows[0]);
    } catch (error) {
        console.error('Error al obtener libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});




module.exports = router;