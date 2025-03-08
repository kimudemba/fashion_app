import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => 
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<{ 
      productId: string;
      size: string;
      color: string;
    }>) => {
      state.items = state.items.filter(
        (item) => 
          !(item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color)
      );

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    updateQuantity: (state, action: PayloadAction<{
      productId: string;
      size: string;
      color: string;
      quantity: number;
    }>) => {
      const item = state.items.find(
        (item) => 
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setLoading,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer; 