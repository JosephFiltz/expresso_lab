import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//get user from local storage to state
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  users: [],
  user: user ? user : null,
  addresses: [],
  page: 1,
  pageNum: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

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

//edit user
export const editUser = createAsyncThunk(
  'auth/editUser',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.editUser(user, token)
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

//logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

//add user address
export const setAddress = createAsyncThunk(
  'auth/setAddress',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.setAddress(data, token)
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

//add user address
export const deleteAddress = createAsyncThunk(
  'auth/deleteAddress',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteAddress(id, token)
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

//get user addresses
export const getAddresses = createAsyncThunk(
  'auth/getAddresses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.getAddresses(token)
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

//admin: get a user
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.getUser(id, token)
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

//admin: get users
export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const page = thunkAPI.getState().auth.page
      return await authService.getUsers(page, token)
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

//admin: delete user
export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.deleteUser(id, token)
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

//create slice containing reducer logic and actions
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //reset state, eg. clear after registering
    resetAuth: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
    resetUserList: (state) => {
      state.users = []
    },
    resetAddress: (state) => {
      state.addresses = []
    },
    resetUserPage: (state) => {
      state.page = 1
      state.pageNum = null
    },
    incrementUserPage: (state) => {
      if (state.page < state.pageNum) {
        state.page = state.page + 1
      }
    },
    decrementUserPage: (state) => {
      if (state.page > 1) {
        state.page = state.page - 1
      }
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
      .addCase(editUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(setAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(setAddress.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(setAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(getAddresses.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.addresses = action.payload
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = action.payload.users
        state.page = action.payload.page
        state.pageNum = action.payload.pageNum
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

//export slice functions(actions)
export const {
  resetAuth,
  resetUserList,
  resetAddress,
  resetUserPage,
  incrementUserPage,
  decrementUserPage,
} = authSlice.actions

export default authSlice.reducer
