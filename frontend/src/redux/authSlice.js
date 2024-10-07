// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Named import
import axios from 'axios';

// Initial state for auth
const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  role: localStorage.getItem('role') || null,
  id: localStorage.getItem('id') || null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'), // Set to true if token exists
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      return response.data; // Assuming response.data contains the token
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      // Clear all authentication data
      state.id = null;
      state.user = null;
      state.role = null;
      state.token = null;
      state.isLoggedIn = false;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        
        // Decode JWT token to extract user data
        const decodedToken = jwtDecode(action.payload.token);

        // Update state with decoded user info
        state.id = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
        state.role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
        state.user = decodedToken?.user || null;
        state.token = action.payload.token;
        state.isLoggedIn = true;

        // Store token and user data in localStorage to persist across reloads
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(decodedToken?.user || {}));
        localStorage.setItem('role', state.role);
        localStorage.setItem('id', state.id);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
