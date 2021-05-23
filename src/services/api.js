import axios from "axios";

const api = axios.create({
  // baseURL: 'https://localhost:44361/api' // local
  baseURL: "http://api.emersonmelomartins.dev.br/api", // cloud
});

api.interceptors.request.use(async (config) => {
  const storagedUser = localStorage.getItem("@Seuphone::user");

  if (storagedUser !== null) {
    const { token } = JSON.parse(localStorage.getItem("@Seuphone::user"));

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
