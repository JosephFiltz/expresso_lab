import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//add product & quantity to cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (data, thunkAPI) => {
    try {
      const { id, quantity } = data

      const product = await cartService.addToCart(id)

      const item = {
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        qty: quantity,
      }

      return item
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart: (state) => initialState,
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload

        const itemExists = state.items.find((x) => x.id === item.id)

        //update item already in cart
        if (itemExists) {
          state.items = state.items.map((x) =>
            x.id === itemExists.id ? item : x
          )
        }
        //else push new item to items
        else {
          state.items = [...state.items, item]
        }

        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer
