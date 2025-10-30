require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'biblioteca_personal',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
});

async function testLogin() {
    try {
        console.log('🔐 TESTEO DE LOGIN MANUAL...');
        
        const email = 'earoche@miumg.edu.gt';
        const password = '123456';
        
        console.log('Credenciales a probar:');
        console.log('   Email:', email);
        console.log('   Password:', password);
        
        // Buscar usuario
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        
        if (result.rows.length === 0) {
            console.log('❌ ERROR: Usuario no encontrado');
            return;
        }
        
        const usuario = result.rows[0];
        console.log('✅ Usuario encontrado:');
        console.log('   ID:', usuario.id);
        console.log('   Nombre:', usuario.nombre);
        console.log('   Email:', usuario.email);
        console.log('   Hash en BD:', usuario.password);
        
        // Verificar password
        const esValido = await bcrypt.compare(password, usuario.password);
        console.log('🔑 Resultado bcrypt.compare:', esValido);
        
        if (esValido) {
            console.log('🎉 ¡LOGIN EXITOSO! El problema está en otra parte.');
        } else {
            console.log('❌ LOGIN FALLIDO - Password incorrecto');
        }
        
    } catch (error) {
        console.error('Error en test:', error);
    } finally {
        await pool.end();
    }
}

testLogin();