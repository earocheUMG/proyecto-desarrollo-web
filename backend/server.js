const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/contacto', require('./routes/contacto'));

// Ruta de prueba
app.get('/api', (req, res) => {
    res.json({ message: 'API de Biblioteca Digital funcionando!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});