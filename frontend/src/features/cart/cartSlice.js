import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartService from './cartService'

//fixes prices to 2 decimals
const fixDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2)
}

const initialState = {
  items: [],
  address: {},
  payment: '',
  itemsPrice: 0.0,
  taxPrice: 0.0,
  shippingPrice: 0.0,
  totalPrice: 0.0,
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

//select address for order
export const selectAddress = createAsyncThunk(
  'cart/selectAddress',
  async (data, thunkAPI) => {
    try {
      return data
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

//select address for order
export const selectPayment = createAsyncThunk(
  'cart/selectPayment',
  async (data, thunkAPI) => {
    try {
      return data
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
    resetCartParams: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
    deleteFromCart: (state, action) => {
      state.items = state.items.filter((x) => x.id !== action.payload)
    },
    setItemsPrice: (state) => {
      state.itemsPrice = fixDecimals(
        state.items.reduce((prev, cur) => prev + cur.price * cur.qty, 0)
      )
    },
    setShippingPrice: (state) => {
      //5$ flat shipping
      state.shippingPrice = fixDecimals(10.0)
    },
    setTaxPrice: (state) => {
      //8% sales tax
      state.taxPrice = fixDecimals(state.itemsPrice * 0.08)
    },
    setTotalPrice: (state) => {
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2)
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
      .addCase(selectAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(selectAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.address = action.payload
      })
      .addCase(selectAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(selectPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(selectPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.payment = action.payload
      })
      .addCase(selectPayment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const {
  resetCart,
  resetCartParams,
  deleteFromCart,
  setItemsPrice,
  setShippingPrice,
  setTaxPrice,
  setTotalPrice,
} = cartSlice.actions

export default cartSlice.reducer
