// cartSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find(item => 
        item.id === product.id && item.itemType === product.itemType
      );
      const newQuantity = product.quantity || 1;

      if (existing) {
        const totalQuantity = existing.quantity + newQuantity;
        if (totalQuantity > 5) {
          alert('לא ניתן להוסיף יותר מ-5 מוצרים של אותו פריט.');
          return;
        }
        existing.quantity = totalQuantity;
      } else {
        state.cartItems.push({
          ...product,
          quantity: Math.min(newQuantity, 5)
        });
      }
    },
    removeFromCart: (state, action) => {
      const { id, itemType } = action.payload;
      state.cartItems = state.cartItems.filter(item => 
        !(item.id === id && item.itemType === itemType)
      );
    },
    updateQuantity: (state, action) => {
      const { id, itemType, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id && item.itemType === itemType);
      if (item) {
        item.quantity = Math.max(quantity, 1);
      }
      state.cartItems = state.cartItems.filter(item => item.quantity > 0);
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce((acc, item) => {
    const price = item.price || item.price_per_hour || 0;
    const quantity = item.quantity || 1;
    return acc + (price * quantity);
  }, 0);

export default cartSlice.reducer;
