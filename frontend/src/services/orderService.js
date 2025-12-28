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

// יצירת הזמנה חדשה
export const createOrder = async (orderData) => {
  try {
    const res = await apiClient.post('/orders', orderData);
    return res.data;
  } catch (error) {
    console.error('שגיאה ביצירת הזמנה:', error.message);
    throw error;
  }
};

// קבלת רשימת ההזמנות של המשתמש
export const getUserOrders = async () => {
  try {
    const res = await apiClient.get('/orders/user');
    return res.data;
  } catch (error) {
    console.error('שגיאה בקבלת הזמנות:', error.message);
    throw error;
  }
};

// קבלת פרטי הזמנה ספציפית
export const getOrderById = async (orderId) => {
  try {
    const res = await apiClient.get(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    console.error('שגיאה בקבלת פרטי הזמנה:', error.message);
    throw error;
  }
};

// מחיקת הזמנה
export const deleteOrder = async (orderId) => {
  try {
    const res = await apiClient.delete(`/orders/${orderId}`);
    return res.data;
  } catch (error) {
    console.error('שגיאה במחיקת הזמנה:', error.message);
    throw error;
  }
};

// עדכון סטטוס תשלום - לא קיים בבקאנד, נשמור לפונקציונליות עתידית
export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    // TODO: להוסיף endpoint בבקאנד בעתיד
    console.warn('עדכון סטטוס תשלום לא נתמך כרגע');
    throw new Error('עדכון סטטוס תשלום לא נתמך כרגע');
  } catch (error) {
    console.error('שגיאה בעדכון סטטוס תשלום:', error.message);
    throw error;
  }
};
