import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService.js'

const initialState = {
  products: [],
  product: {},
  page: 1,
  pageNum: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//get all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, thunkAPI) => {
    try {
      const page = thunkAPI.getState().order.page
      return await productService.getProducts(page)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get one product by id
export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get featured products
export const getFeaturedProducts = createAsyncThunk(
  'products/getFeaturedProducts',
  async (_, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => initialState,
    incrementProductPage: (state) => {
      if (state.page < state.pageNum) {
        state.page = state.page + 1
      }
    },
    decrementProductPage: (state) => {
      if (state.page > 1) {
        state.page = state.page - 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //get all products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload.products
        state.page = action.payload.page
        state.pageNum = action.payload.pageNum
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //get product by id
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.product = action.payload
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //get
      .addCase(getFeaturedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.products = action.payload
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetProduct, incrementProductPage, decrementProductPage } =
  productSlice.actions

export default productSlice.reducer
