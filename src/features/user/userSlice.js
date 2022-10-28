import { createSlice } from '@reduxjs/toolkit'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'
import {
  loginUserExtraReducers,
  registerUserExtraReducers,
  updateUserExtraReducers,
} from './userThunk'

const initialState = {
  isLoading: false,
  isSmallSidebarOpen: false,
  isBigSidebarOpen: true,
  user: getUserFromLocalStorage(),
}

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
    ...registerUserExtraReducers,
    // user : iskh@yopmail.com/123456
    ...loginUserExtraReducers,
    ...updateUserExtraReducers,
  },
})

export const { toggleSmallSidebar, toggleBigSidebar, logoutUser } =
  userSlice.actions

export default userSlice.reducer
