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

export const getAllDrivers = async () => {
  try {
    const res = await apiClient.get('/drivers'); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getAllDrivers:', error.message);
    throw error;
  }
};

export const getDriverById = async (id) => {
  try {
    const res = await apiClient.get(`/drivers/${id}`); 
    return res.data;
  } catch (error) {
    console.error('שגיאה ב-getDriverById:', error.message);
    throw error;
  }
};
