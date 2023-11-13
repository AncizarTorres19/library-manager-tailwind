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
          request.headers['Authorization'] = `Bearer ${token}`;
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

// axios para el backend del módulo de energía
export const axiosClientEnergyProjects = createAxiosClient(import.meta.env.VITE_PUBLIC_BACKEND_URL_ENERGIA);
// axios para el backend del módulo de agro
export const axiosClientAgroProjects = createAxiosClient(import.meta.env.VITE_PUBLIC_BACKEND_URL_AGRO);
// axios para el backend del módulo de huella
export const axiosClientCarbonFootprint = createAxiosClient(import.meta.env.VITE_PUBLIC_BACKEND_URL_HUELLA);
// axios para el backend del módulo de en comun
export const axiosClient = createAxiosClient(import.meta.env.VITE_PUBLIC_BACKEND_URL);
