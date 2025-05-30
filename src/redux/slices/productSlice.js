import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, size, categoryId }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        categoryId ? `/api/product/category/${categoryId}` : "/api/product",
        {
          params: { page, size },
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data.data; 
    } catch (error) {
      console.error("Fetch products error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/${productId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
      return response.data.data; 
    } catch (error) {
      console.error("Fetch product by ID error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: null,
    totalPages: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.content || [];
        state.totalPages = action.payload.totalPages || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
