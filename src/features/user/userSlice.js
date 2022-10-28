import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import {
  registerUrl,
  userPayloadCreator,
  userSessionExtraReducerCreator,
} from './userHelper'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  user: getUserFromLocalStorage(),
}

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
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
  extraReducers: {
    ...userSessionExtraReducerCreator(registerUser, 'Hello There'),
    ...userSessionExtraReducerCreator(loginUser, 'Welcome Back'),
  },
})

export const { toggleSidebar } = userSlice.actions

export default userSlice.reducer
