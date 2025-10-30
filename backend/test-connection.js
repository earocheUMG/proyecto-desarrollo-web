// test-connection.js
const pool = require('./backend/config/database');

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('✅ Conexión a la BD exitosa:', result.rows[0]);
        
        const libros = await pool.query('SELECT * FROM libros');
        console.log('📚 Libros encontrados:', libros.rows);
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    }
}

testConnection();