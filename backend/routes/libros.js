const express = require('express');
const pool = require('../config/database');

const router = express.Router();

// Middleware para verificar token
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

// Obtener todos los libros del usuario
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

// Obtener un libro específico
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

// Crear un nuevo libro
router.post('/', verificarToken, async (req, res) => {
    try {
        const { titulo, autor, isbn, genero, año_publicacion, portada_url } = req.body;
        
        if (!titulo || !autor) {
            return res.status(400).json({ error: 'Título y autor son obligatorios' });
        }

        const nuevoLibro = await pool.query(
            `INSERT INTO libros (titulo, autor, isbn, genero, año_publicacion, portada_url, usuario_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [titulo, autor, isbn, genero, año_publicacion, portada_url, req.usuario.userId]
        );
        
        res.status(201).json(nuevoLibro.rows[0]);
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar un libro
router.put('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, isbn, genero, año_publicacion, portada_url } = req.body;
        
        const libroActualizado = await pool.query(
            `UPDATE libros 
             SET titulo = $1, autor = $2, isbn = $3, genero = $4, año_publicacion = $5, portada_url = $6 
             WHERE id = $7 AND usuario_id = $8 
             RETURNING *`,
            [titulo, autor, isbn, genero, año_publicacion, portada_url, id, req.usuario.userId]
        );
        
        if (libroActualizado.rows.length === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        
        res.json(libroActualizado.rows[0]);
    } catch (error) {
        console.error('Error al actualizar libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar un libro
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        const libroEliminado = await pool.query(
            'DELETE FROM libros WHERE id = $1 AND usuario_id = $2 RETURNING *',
            [id, req.usuario.userId]
        );
        
        if (libroEliminado.rows.length === 0) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        
        res.json({ mensaje: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar libro:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;