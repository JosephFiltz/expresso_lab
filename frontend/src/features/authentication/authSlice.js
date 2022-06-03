import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//get user
const user = JSON.parse(localStorage.getItem('user'))

//register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      //call async service action
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      //return error message if fail
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//create slice containing reducer logic and actions
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //reset state, eg. clear after registering
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  //async thunk functions go here
  extraReducers: (builder) => {
    builder
      //eg. loading after submitting form
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      //successful registration
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        //user returned from authService.register(user)
        state.user = action.payload
      })
      //failed registration
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        //error message from authService.register(user)
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      //successful login
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      //failed login
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

//export slice functions(actions)
export const { reset } = authSlice.actions

export default authSlice.reducer
