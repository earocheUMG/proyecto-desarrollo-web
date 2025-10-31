import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { librosAPI } from '../services/api';
import './Biblioteca.css';

const Biblioteca = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { usuario } = useAuth();

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const data = await librosAPI.obtenerLibros();
      setLibros(data);
      setLibros(data);
console.log('Libros cargados:', data);
    } catch (err) {
      setError('Error al cargar los libros: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="biblioteca">
        <div className="container">
          <div className="loading">
            <h2>Cargando tu biblioteca...</h2>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="biblioteca">
      <div className="container">
        <header className="biblioteca-header">
          <h1>Mi Biblioteca Personal</h1>
          <p>Bienvenido, {usuario?.nombre}. Aquí están todos tus libros.</p>
          <div className="biblioteca-stats">
            <span className="stat">{libros.length} libros en tu colección</span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {libros.length === 0 ? (
          <div className="empty-library">
            <h3>Tu biblioteca está vacía</h3>
            <p>Comienza agregando algunos libros a tu colección.</p>
            <button className="btn btn-primary">Agregar Primer Libro</button>
          </div>
        ) : (
          <div className="libros-grid">
            {libros.map(libro => (
              <div key={libro.id} className="libro-card">
                <div className="libro-portada">
                  <img 
                    src={libro.portada_url || 'https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg'} 
                    alt={libro.titulo} 
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/1926988/pexels-photo-1926988.jpeg';
                    }}
                  />
                </div>
                <div className="libro-info">
                  <h3 className="libro-titulo">{libro.titulo}</h3>
                  <p className="libro-autor">por {libro.autor}</p>
                  <div className="libro-details">
                    {libro.genero && <span className="genero">{libro.genero}</span>}
                    {libro.año_publicacion && <span className="año">{libro.año_publicacion}</span>}
                  </div>
                  {libro.isbn && (
                    <p className="libro-isbn">ISBN: {libro.isbn}</p>
                  )}
                </div>
                <div className="libro-actions">
                  <button className="btn-action">Leer</button>
                  <button className="btn-action">Editar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Biblioteca;