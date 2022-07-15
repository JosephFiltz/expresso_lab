import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService.js'

const initialState = {
  orders: [],
  order: {},
  page: 1,
  pageNum: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  deliveredSuccess: false,
  deliveredLoading: false,
  message: '',
}

//set new order
export const setOrder = createAsyncThunk(
  'orders/setOrder',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.setOrder(data, token)
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

//get user orders
export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const page = thunkAPI.getState().order.page
      return await orderService.getUserOrders(page, token)
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

//admin: get a user's orders
export const getUserIdOrders = createAsyncThunk(
  'orders/getUserIdOrders',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const page = thunkAPI.getState().order.page
      return await orderService.getUserIdOrders(page, id, token)
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

//get one order by id
export const getOrder = createAsyncThunk(
  'orders/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.getOrder(id, token)
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

//admin: get all orders
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const page = thunkAPI.getState().order.page
      return await orderService.getOrders(page, token)
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

//set order paid
export const setOrderPaid = createAsyncThunk(
  'orders/setOrderPaid',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.setOrderPaid(id, token)
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

//set order delivered
export const setOrderDelivered = createAsyncThunk(
  'orders/setOrderDelivered',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await orderService.setOrderDelivered(id, token)
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
    incrementOrderPage: (state) => {
      if (state.page < state.pageNum) {
        state.page = state.page + 1
      }
    },
    decrementOrderPage: (state) => {
      if (state.page > 1) {
        state.page = state.page - 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(setOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload.orders
        state.page = action.payload.page
        state.pageNum = action.payload.pageNum
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserIdOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserIdOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload.orders
        state.page = action.payload.page
        state.pageNum = action.payload.pageNum
      })
      .addCase(getUserIdOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = action.payload.orders
        state.page = action.payload.page
        state.pageNum = action.payload.pageNum
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(setOrderPaid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setOrderPaid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(setOrderPaid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(setOrderDelivered.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setOrderDelivered.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload
      })
      .addCase(setOrderDelivered.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetOrder, incrementOrderPage, decrementOrderPage } =
  orderSlice.actions

export default orderSlice.reducer
