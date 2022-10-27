import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'

const initialState = {
  isLoading: false,
  user: null,
}

const userPayloadCreator = (url) => async (user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

const isTesting = false
const registerUrl = isTesting ? '/auth/testingRegister' : '/auth/register'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  userPayloadCreator(registerUrl)
)

// user : iskh@yopmail.com/123456
export const loginUser = createAsyncThunk(
  'user/loginUser',
  userPayloadCreator('/auth/login')
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.isLoading = false
      toast.success(`Hello There ${user.name}`)
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.user = user
      state.isLoading = false
      toast.success(`Welcome Back ${user.name}`)
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export default userSlice.reducer
