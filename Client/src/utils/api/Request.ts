import axios, { AxiosResponse } from "axios";
import { URL_BACKEND } from "../../constant/URL";

const responSeBody = (respose: AxiosResponse) => respose.data;

const api = axios.create({
  baseURL: URL_BACKEND, // Cambia por tu URL base
  timeout: 5000, // Tiempo máximo de espera (opcional)
});

api.interceptors.request.use(
  (config) => {
    const info = localStorage.getItem("info"); // O usa tu método para obtener el token
    if (info) {
      const { TOKEN } = JSON.parse(info);
      if (TOKEN) config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const redirect = () => (window.location.href = "/");

export const requestApis = {
  get: (uri: string) => api.get(uri).then(responSeBody),
  post: (uri: string, body: object) => api.post(uri, body).then(responSeBody),
  put: (uri: string, body: object) => api.put(uri, body).then(responSeBody),
  del: (uri: string) => api.delete(uri).then(responSeBody),
};
