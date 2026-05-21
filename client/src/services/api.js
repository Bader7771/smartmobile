import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;
const isLocalApiUrl = configuredApiUrl && /localhost|127\.0\.0\.1/.test(configuredApiUrl);

const normalizeApiUrl = (url) => {
  if (!url) {
    return '/api';
  }

  const trimmedUrl = url.replace(/\/+$/, '');
  return trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`;
};

const baseURL = isProduction && isLocalApiUrl
  ? '/api'
  : normalizeApiUrl(configuredApiUrl);

export const getAssetUrl = (url) => {
  if (!url || url.startsWith('http') || url.startsWith('data:')) {
    return url;
  }

  if (!url.startsWith('/uploads')) {
    return url;
  }

  if (!baseURL.startsWith('http')) {
    return url;
  }

  return `${baseURL.replace(/\/api\/?$/, '')}${url}`;
};

export const getListFromResponse = (responseData, keys = ['cars', 'data', 'products']) => {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (!responseData || typeof responseData !== 'object') {
    return [];
  }

  for (const key of keys) {
    if (Array.isArray(responseData[key])) {
      return responseData[key];
    }
  }

  return [];
};

export const getItemFromResponse = (responseData, keys = ['car', 'data', 'product']) => {
  if (!responseData || typeof responseData !== 'object' || Array.isArray(responseData)) {
    return null;
  }

  for (const key of keys) {
    if (responseData[key] && typeof responseData[key] === 'object' && !Array.isArray(responseData[key])) {
      return responseData[key];
    }
  }

  return responseData;
};

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

/* Attach token from localStorage on every request */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('autosmart_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* Handle 401 errors globally */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('autosmart_token');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
