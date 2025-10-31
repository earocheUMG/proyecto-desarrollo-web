const { Pool } = require('pg');
require('dotenv').config(); 

console.log('Configurando PostgreSQL con:');
console.log('   Host:', process.env.DB_HOST);
console.log('   Puerto:', process.env.DB_PORT);
console.log('   Base de datos:', process.env.DB_NAME);
console.log('   Usuario:', process.env.DB_USER);

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'biblioteca_personal',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT) || 5432,
    
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : false
});


pool.on('connect', () => {
    console.log('Conexión exitosa a PostgreSQL');
});

pool.on('error', (err) => {
    console.error('Error de conexión PostgreSQL:', err.message);
    console.log('Recomendación: Verifica que PostgreSQL esté corriendo');
});


const testConnection = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT version()');
        console.log('PostgreSQL conectado - Versión:', result.rows[0].version);
        client.release();
    } catch (err) {
        console.error('No se pudo conectar a PostgreSQL:', err.message);
        console.log('Soluciones posibles:');
        console.log('   1. Ejecuta: psql -U postgres -h localhost');
        console.log('   2. Verifica que la BD "biblioteca_personal" exista');
        console.log('   3. Revisa la contraseña en el archivo .env');
    }
};


testConnection();

module.exports = pool;