import {jwtDecode} from 'jwt-decode'; // Correctly import jwtDecode
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  role: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
  return response.data; // Adjust based on your backend response format
});

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // Decode the token
        const decodedToken = jwtDecode(action.payload.token); // Assuming action.payload.token contains the JWT
        

        state.user = decodedToken.email; // Assuming the email is included in the token
        state.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null; // Extract the role from the decoded token
        state.isLoggedIn = true;

      
      })
      
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Reset error on successful signup
      });
  },
  
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
