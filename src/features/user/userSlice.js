import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import {
  loginUrl,
  registerUrl,
  updateUserUrl,
  userPayloadCreator,
  userSessionExtraReducerCreator,
} from './userHelper'

const initialState = {
  isLoading: false,
  isSmallSidebarOpen: false,
  isBigSidebarOpen: true,
  user: getUserFromLocalStorage(),
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  userPayloadCreator(registerUrl, 'post')
)

// user : iskh@yopmail.com/123456
export const loginUser = createAsyncThunk(
  'user/loginUser',
  userPayloadCreator(loginUrl, 'post')
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  userPayloadCreator(updateUserUrl, 'patch', true)
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSmallSidebar: (state) => {
      state.isSmallSidebarOpen = !state.isSmallSidebarOpen
    },
    toggleBigSidebar: (state) => {
      state.isBigSidebarOpen = !state.isBigSidebarOpen
    },
    logoutUser: (state) => {
      state.user = null
      removeUserFromLocalStorage()
    },
  },
  extraReducers: {
    ...userSessionExtraReducerCreator(registerUser, 'Hello There'),
    ...userSessionExtraReducerCreator(loginUser, 'Welcome Back'),
    ...userSessionExtraReducerCreator(updateUser, 'User Updated!', true, {
      logoutUser: () => logoutUser(),
    }),
  },
})

export const { toggleSmallSidebar, toggleBigSidebar, logoutUser } =
  userSlice.actions

export default userSlice.reducer
