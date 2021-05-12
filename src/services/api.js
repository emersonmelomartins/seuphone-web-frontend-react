import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:44361/api' // local
  // baseURL: 'http://api.emersonmelomartins.dev.br/api' // cloud
  
})


api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("@Seuphone::token");
  if (token !== undefined || token !== "" || token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;