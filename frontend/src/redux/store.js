// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import your auth slice

// Configure Redux store with auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
