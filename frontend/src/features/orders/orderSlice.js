import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService.js'

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
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

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState,
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
  },
})

export const { resetOrder } = orderSlice.actions

export default orderSlice.reducer
