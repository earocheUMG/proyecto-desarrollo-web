import React, { useState } from 'react';
import { contactoAPI } from '../services/api';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await contactoAPI.enviarMensaje(formData);
      setEnviado(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar el mensaje. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="contacto">
        <div className="container">
          <div className="mensaje-exito">
            <div className="exito-icon">✓</div>
            <h2>¡Mensaje enviado con éxito!</h2>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <button 
              onClick={() => setEnviado(false)}
              className="btn btn-primary"
            >
              Enviar otro mensaje
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contacto">
      <div className="container">
        <div className="contacto-header">
          <h1>Contacto</h1>
          <p>¿Tienes preguntas o sugerencias? Nos encantaría escucharte.</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="contacto-content">
          <div className="contacto-info">
            <h3>Información de Contacto</h3>
            <div className="contacto-item">
              <span className="icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>contacto@bibliotecadigital.com</p>
              </div>
            </div>
            <div className="contacto-item">
              <span className="icon">📱</span>
              <div>
                <strong>Teléfono</strong>
                <p>+502 5555-5555</p>
              </div>
            </div>
            <div className="contacto-item">
              <span className="icon">🏢</span>
              <div>
                <strong>Dirección</strong>
                <p>Dirección de Prueba</p>
              </div>
            </div>
          </div>

          <form className="contacto-form" onSubmit={handleSubmit}>
            <h3>Envíanos un mensaje</h3>
            
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="6"
                required
                placeholder="Escribe tu mensaje aquí..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacto;