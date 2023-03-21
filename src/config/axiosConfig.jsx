import axios from 'axios';

const axiosInstancia = axios.create({
  // opciones y configuraciones aquí

  //cambiamos el enlace por una variable de entorno
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default axiosInstancia;