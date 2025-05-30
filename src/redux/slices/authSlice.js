import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', null, {
        params: { email, password },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        }
      });
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }

      localStorage.setItem('token', response.data.data.token);
      return response.data;
    } catch (error) {
      console.error('Login API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed');
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', null, {
        params: { email, password },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        }
      });
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Register API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed');
    }
  }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-otp', null, {
        params: { email, otp },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json, text/plain, */*'
        }
      });
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      if (response.data.data) {
        localStorage.setItem('token', response.data.data);
      }
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data?.message || error.message || 'OTP verification failed');
    }
  }
);

// Async thunk for fetching profile
export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/profile', {
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error('Profile API error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.data.token;
        state.user = { email: action.meta.arg.email };
        localStorage.setItem('user', JSON.stringify({ email: action.meta.arg.email }));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.data) {
          state.token = action.payload.data;
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = { ...state.user, ...action.payload.data };
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;