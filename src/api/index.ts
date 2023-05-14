import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

type ApiRequest = {
  get: (url: string) => {};
  delete: (url: string) => {};
  post: (url: string, data: { title: string }) => {};
};

const apiRequest: ApiRequest = {
  get: (url) => baseInstance.get(url),
  delete: (url) => baseInstance.delete(url),
  post: (url, data) => baseInstance.post(url, data),
};

export default apiRequest;
