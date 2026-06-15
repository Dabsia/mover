import axios from "axios";

const api = axios.create({
  baseURL: 'https://involved-birgit-zinter-cb767b47.koyeb.app/api/',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
