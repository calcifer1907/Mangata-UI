import axios, { AxiosResponse } from "axios";

import { URL_BACKEND, VITE_URL_UI } from "../../constant/URL";

const responSeBody = (respose: AxiosResponse) => respose.data;

const api = axios.create({
  baseURL: URL_BACKEND, // Cambia por tu URL base
  timeout: 5000, // Tiempo máximo de espera (opcional)
  headers: {
    "Content-Type": "application/json",
    // Asegúrate que Axios no intente interpretar scripts
    "X-Content-Type-Options": "nosniff",
  },
  // Asegúrate que las credenciales se manejen adecuadamente
  // withCredentials: true,
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

import { AxiosError } from "axios";

const redirect = (error: AxiosError) => {
  if (error.response && error.response.status === 403) {
    localStorage.removeItem("info");
    window.location.href = VITE_URL_UI;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return Promise.reject(error);
};

export const requestApis = {
  get: (uri: string) => api.get(uri).then(responSeBody).catch(redirect),
  post: (uri: string, body: object, headers?: object) =>
    api.post(uri, body, headers).then(responSeBody).catch(redirect),
  put: (uri: string, body: object) =>
    api.put(uri, body).then(responSeBody).catch(redirect),
  del: (uri: string) => api.delete(uri).then(responSeBody).catch(redirect),
};
