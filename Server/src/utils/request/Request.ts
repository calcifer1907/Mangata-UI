import axios, { AxiosResponse } from "axios";

import { BOLD_URL, BOLD_KEY } from "../../configDB";

const responSeBody = (respose: AxiosResponse) => respose.data;

const api = axios.create({
  baseURL: BOLD_URL, // Cambia por tu URL base
});

export const requestApis = {
  get: (uri: string, headers?: Object) =>
    api.get(uri, headers).then(responSeBody),
  post: (uri: string, body: object, headers?: object) =>
    api.post(uri, body, headers).then(responSeBody),
  put: (uri: string, body: object) => api.put(uri, body).then(responSeBody),
  del: (uri: string) => api.delete(uri).then(responSeBody),
};
