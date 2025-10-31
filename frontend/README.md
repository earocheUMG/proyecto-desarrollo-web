# Biblioteca Personal Digital

## Información del Proyecto
**Desarrollado por:** Eduardo Humberto Aroche Noriega  
**Universidad:** Universidad Mariano Gálvez de Guatemala  
**Curso:** Desarrollo Web  
**Repositorio:** [https://github.com/earocheUMG/proyecto-desarrollo-web]

## Descripción
Aplicación sencilla donde se pusieron en practica los conocimientos adquiridos durante el curso de desarrollo web, utilizando HTML, JavaScript y CSS, a traves de una arquitectura moderna como es React + Node.js

## Características Principales
- **Autenticación segura** - Registro e inicio de sesión con JWT
- **Gestión de libros** - Agregar y visualizar tu biblioteca personal
- **Diseño responsive** - Compatible con móviles, tablets y desktop
- **Interfaz intuitiva** - Fácil de usar y navegar
- **Protección de rutas** - Acceso restringido a usuarios autenticados
- **Arquitectura moderna** - Frontend React + Backend Node.js

## 🛠️ Tecnologías Utilizadas

### Frontend
- React.js 18.2.0
- CSS3 con diseño responsive
- React Router DOM 6.15.0
- Axios 1.5.0 para peticiones HTTP

### Backend
- Node.js 18.0+
- Express.js 4.18.2
- PostgreSQL con pg 8.11.0
- JWT para autenticación
- Bcryptjs para encriptación


## Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/earocheUMG/proyecto-desarrollo-web.git
cd proyecto-desarrollo-web
Configurar el Backend

bash
cd backend
npm install

# Variables de entorno
cp .env.example .env
Editar archivo .env del backend:

env
PORT=5000
DB_USER=postgres
DB_PASSWORD=tu_password_postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=biblioteca_personal
JWT_SECRET=tu_jwt_secreto
NODE_ENV=development

Configurar la Base de Datos

sql
-- Conectar a PostgreSQL y ejecutar:
CREATE DATABASE biblioteca_personal;

-- Ejecutar el schema para crear tablas
\i database/schema.sql
Configurar el Frontend

bash
cd ../frontend
npm install

# Configurcion de API URL
echo "REACT_APP_API_URL=http://localhost:5000" > .env
Ejecutar la Aplicación

bash

cd backend
npm run dev


cd frontend
npm start

Estructura del Proyecto
text
proyecto-desarrollo-web/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuración PostgreSQL
│   ├── routes/
│   │   ├── auth.js              # Rutas de autenticación
│   │   └── libros.js            # Rutas de libros
│   ├── middleware/
│   │   └── authMiddleware.js    # Middleware de autenticación
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── pages/               # Páginas principales
│   │   ├── context/             # Context API
│   │   ├── services/            # Configuración API
│   │   └── styles/              # Estilos CSS
│   └── package.json
└── README.md

Funcionalidades
Autenticación
Registro de nuevos usuarios con validación

Login seguro con JWT tokens

Protección de rutas privadas

Persistencia de sesión

Gestión de Libros

Visualizar todos los libros del usuario

Interfaz de tarjetas para mejor visualización

Interfaz de Usuario
Página de inicio con hero section y características

Sección visión/misión con diseño de tres tarjetas

Navegación responsive con menús dinámicos

Footer con información de contacto y redes sociales

API Endpoints
Autenticación
POST /api/auth/registro - Registrar usuario

POST /api/auth/login - Iniciar sesión

GET /api/auth/verificar - Verificar token

Libros
GET /api/libros - Obtener libros del usuario (requiere autenticación)

Uso de la Aplicación
Registro: Crear una nueva cuenta desde la página principal

Login: Iniciar sesión con email y contraseña

Dashboard: Acceder a la biblioteca personal después del login

Navegación: Usar el menú para moverse entre secciones

Diseño y Experiencia
Paleta de colores: Gradientes morados y azules

Tipografía: Fuentes limpias y legibles

Responsive: Grid system adaptable a todos los dispositivos

Interacciones: Efectos hover y transiciones suaves





