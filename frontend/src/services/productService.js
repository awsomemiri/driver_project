import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5263/api', // .NET API URL
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

export const getAllProducts = async () => {
  try {
    const res = await apiClient.get('/products'); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getAllProducts:', error.message);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await apiClient.get(`/products/${id}`); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getProductById:', error.message);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const res = await apiClient.get(`/products/category/${categoryId}`);
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getProductsByCategory:', error.message);
    throw error;
  }
};
