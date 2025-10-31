const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: [
        'http://localhost:3000',
        process.env.FRONTEND_URL 
    ].filter(Boolean), 
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/contacto', require('./routes/contacto'));

app.get('/api', (req, res) => {
    res.json({ message: 'API de Biblioteca Digital funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});