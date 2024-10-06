import { jwtDecode } from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  role: null,
  id: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data; // Adjust based on your backend response format
  } catch (error) {
    // Pass the error message to the rejected action
    return rejectWithValue(error.response.data.message || 'Login failed'); // Ensure your backend sends a meaningful message
  }
});

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Signup failed'); // Handle errors similarly
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.id = null;
      state.user = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new login attempt
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        // Decode the token
        const decodedToken = jwtDecode(action.payload.token); // Assuming action.payload.token contains the JWT
        console.log("Decoded Token:", decodedToken);

        state.id = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
        state.role = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Get error message from the payload or fallback
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Reset error on successful signup
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; // Handle signup errors similarly
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
