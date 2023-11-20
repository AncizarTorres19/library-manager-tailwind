import axios from 'axios';

const createAxiosClient = (baseURL) => {
  const axiosClient = axios.create({
    baseURL,
  });

  axiosClient.interceptors.request.use(
    (request) => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers['x-token'] = token;
        }
      } catch (e) {}

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosClient;
};

// axios para el backend
export const axiosClient = createAxiosClient(import.meta.env.VITE_PUBLIC_BACKEND_URL);
