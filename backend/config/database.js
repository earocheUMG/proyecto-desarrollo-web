const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'biblioteca_personal',
    password: process.env.DB_PASSWORD || 'Mizore.1318!',
    port: process.env.DB_PORT || 5432,
});

// Probar la conexión
pool.on('connect', () => {
    console.log('✅ Conectado a la base de datos PostgreSQL');
});

pool.on('error', (err) => {
    console.error('❌ Error de conexión a la BD:', err);
});

module.exports = pool;