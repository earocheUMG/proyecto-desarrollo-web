const pool = require('./config/database');
const bcrypt = require('bcryptjs');

async function testAuth() {
    try {
        console.log('🔍 Verificando usuarios en la BD...');
        
        const usuarios = await pool.query('SELECT * FROM usuarios');
        console.log('👥 Usuarios en la BD:', usuarios.rows);
        
        // Testear bcrypt
        const testPassword = 'mi_contraseña';
        const hash = await bcrypt.hash(testPassword, 10);
        console.log('🔐 Hash de prueba:', hash);
        
        const isValid = await bcrypt.compare(testPassword, hash);
        console.log('✅ Bcrypt funciona:', isValid);
        
    } catch (error) {
        console.error('❌ Error en test:', error);
    }
}

testAuth();