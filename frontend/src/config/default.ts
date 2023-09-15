const config = {
  IS_PRODUCTION: import.meta.env.PROD,
  API_ENDPOINT: import.meta.env.PROD
    ? import.meta.env.VITE_API_ENDPOINT
    : "http://127.0.0.1:8000/",
};

export default config;
