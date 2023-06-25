import { PropsWithChildren, useEffect } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import api from '../service/api';
import { useAppStore } from '../store';

const AxiosInterceptor = ({ children }: PropsWithChildren) => {
  const [state] = useAppStore();

  const { token } = state;

  const reqInterceptor = (config: InternalAxiosRequestConfig) => {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      reqInterceptor,
      // (error) => Promise.reject(error),
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [state]);

  return (
    children
  );
};

export default AxiosInterceptor;
