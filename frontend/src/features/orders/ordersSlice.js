import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, getUserOrders, getOrderById, deleteOrder, updatePaymentStatus } from '../../services/orderService';

// Async thunks
export const createNewOrder = createAsyncThunk(
  'orders/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה ביצירת הזמנה');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בקבלת הזמנות');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getOrderById(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בקבלת פרטי הזמנה');
    }
  }
);

export const removeOrder = createAsyncThunk(
  'orders/removeOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await deleteOrder(orderId);
      return { orderId, response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה במחיקת הזמנה');
    }
  }
);

export const updateOrderPaymentStatus = createAsyncThunk(
  'orders/updateOrderPaymentStatus',
  async ({ orderId, paymentStatus }, { rejectWithValue }) => {
    try {
      const response = await updatePaymentStatus(orderId, paymentStatus);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'שגיאה בעדכון סטטוס תשלום');
    }
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.unshift(action.payload);
        state.error = null;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete order
      .addCase(removeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(order => order.id !== action.payload.orderId);
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update payment status
      .addCase(updateOrderPaymentStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderPaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        if (state.currentOrder && state.currentOrder.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updateOrderPaymentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentOrder } = ordersSlice.actions;

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;
