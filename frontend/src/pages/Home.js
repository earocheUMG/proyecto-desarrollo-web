import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { usuario } = useAuth();

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Tu Biblioteca Personal Digital</h1>
                    <p>Organiza, gestiona y disfruta de tu colección de libros en un solo lugar</p>
                    
                    {!usuario ? (
                        <div className="hero-buttons">
                            <Link to="/registro" className="btn btn-primary">Crear Usuario</Link>
                            <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
                        </div>
                    ) : (
                        <div className="hero-buttons">
                            <Link to="/biblioteca" className="btn btn-primary">Ver Mi Biblioteca</Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>Que Ofrecemos</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Organiza tus Libros</h3>
                            <p>Puedes llevar un control y registro de tus libros favoritos</p>
                        </div>
                        <div className="feature-card">
                            <h3>Facil de Buscar</h3>
                            <p>Busca cualquier libro que desees facilmente</p>
                        </div>
                        <div className="feature-card">
                            <h3>Acceso siempre disponible</h3>
                            <p>Disponibilidad 24/7 en cualquier dispositivo</p>
                        </div>
                    </div>
                </div>
            </section>

            
          <section className="vision-mision">
    <div className="container">
        <h2>Nuestro Propósito</h2>
        <div className="vision-mision-grid">
            <div className="vision-card">
                <h3>VISIÓN</h3>
                <p>Ser la plataforma líder en gestión de bibliotecas personales, haciendo la lectura accesible y organizada para todos</p>
            </div>
            
            <div className="imagen-card">
                <img 
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Biblioteca digital" 
                    className="center-image"
                />
            </div>
            
            <div className="mision-card">
                <h3>MISIÓN</h3>
                <p>Proporcionar herramientas intuitivas para que los amantes de la lectura puedan organizar, descubrir y disfrutar de sus libros digitalmente</p>
            </div>
        </div>
    </div>
</section>
        </div>
    );
};

export default Home;