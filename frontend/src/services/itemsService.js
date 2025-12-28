import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5263/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor להוספת token ל-authorization header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAllItems = async () => {
  try {
    const res = await apiClient.get('/items'); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getAllItems:', error.message);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const res = await apiClient.get(`/items/${id}`); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getItemById:', error.message);
    throw error;
  }
};

export const getItemsByCategory = async (categoryId) => {
  try {
    const res = await apiClient.get(`/items/category/${categoryId}`);
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getItemsByCategory:', error.message);
    throw error;
  }
};
