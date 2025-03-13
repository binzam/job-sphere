const API_URL =
  import.meta.env.VITE_MODE === 'development'
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL;

export default API_URL;
