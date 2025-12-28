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

// הרשמה
export const register = async (userData) => {
  try {
    const res = await apiClient.post('/users/register', userData);
    return res.data;
  } catch (error) {
    console.error('שגיאה בהרשמה:', error.message);
    throw error;
  }
};

// התחברות
export const login = async (credentials) => {
  try {
    const res = await apiClient.post('/users/login', credentials);
    const { token, user } = res.data;
    
    // שמירת token ב-localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return res.data;
  } catch (error) {
    console.error('שגיאה בהתחברות:', error.message);
    throw error;
  }
};

// התנתקות
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// קבלת פרטי משתמש נוכחי - משתמש בנתונים משומרים ב-localStorage
export const getCurrentUser = async () => {
  try {
    // נשתמש בנתונים שנשמרו ב-localStorage מה-login
    const user = getStoredUser();
    if (!user) {
      throw new Error('לא נמצא משתמש מחובר');
    }
    return user;
  } catch (error) {
    console.error('שגיאה בקבלת פרטי משתמש:', error.message);
    throw error;
  }
};

// עדכון פרטי משתמש - דורש user ID
export const updateUser = async (userId, userData) => {
  try {
    const res = await apiClient.put(`/users/${userId}`, userData);
    return res.data;
  } catch (error) {
    console.error('שגיאה בעדכון פרטי משתמש:', error.message);
    throw error;
  }
};

// בדיקה אם משתמש מחובר
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// קבלת פרטי משתמש מה-localStorage
export const getStoredUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};
