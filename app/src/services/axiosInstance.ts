import axios from 'axios';

// Crea una instancia de axios para manejar las peticiones
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // Usa la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
