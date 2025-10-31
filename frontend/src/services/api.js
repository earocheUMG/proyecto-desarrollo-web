import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const authAPI = {
  login: async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
  },

  registro: async (nombre, email, password) => {
    const response = await API.post('/auth/registro', { nombre, email, password });
    return response.data;
  },

  verificarToken: async () => {
    const response = await API.get('/auth/verificar');
    return response.data;
  }
};


export const librosAPI = {
  obtenerLibros: async () => {
    const response = await API.get('/libros');
    return response.data;
  },

  obtenerLibro: async (id) => {
    const response = await API.get(`/libros/${id}`);
    return response.data;
  }
};


export const contactoAPI = {
  enviarMensaje: async (mensaje) => {
    const response = await API.post('/contacto', mensaje);
    return response.data;
  }
};

export default API;