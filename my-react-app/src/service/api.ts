import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { localStorageGet } from '../utils/localStorage';
import { sessionStorageGet } from '../utils/sessionStorage';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = () => {
  const defaultOptions:CreateAxiosDefaults<any> = {
    baseURL,

    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    // },
  };

  const reqInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = localStorageGet('token') || sessionStorageGet('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    reqInterceptor,
  );

  instance.interceptors.response.use(
    (config) => config,
    (error) => {
      const message = error.response?.data.message || error.message || error;
      if (Array.isArray(message)) {
        message.forEach((item: string) => {
          toast.error(item, { theme: 'colored' });
        });
      } else {
        toast.error(message, { theme: 'colored' });
      }
      // return error.response || { data: error };
      throw new Error(message);
    },
  );

  return instance;
};

export default api();
