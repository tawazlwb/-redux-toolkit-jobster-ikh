import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  userAsyncThunkPayloadCreator,
  userSessionExtraReducerCreator,
} from './userThunkHelper'

const isTesting = false // testUser@test.com/secret
const registerUrl = isTesting ? '/auth/testingRegister' : '/auth/register'
const loginUrl = '/auth/login'
const updateUserUrl = '/auth/updateUser'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  userAsyncThunkPayloadCreator(registerUrl, 'post')
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  userAsyncThunkPayloadCreator(loginUrl, 'post')
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  userAsyncThunkPayloadCreator(updateUserUrl, 'patch')
)

export const registerUserExtraReducers = userSessionExtraReducerCreator(
  registerUser,
  'Hello There'
)

export const loginUserExtraReducers = userSessionExtraReducerCreator(
  loginUser,
  'Welcome Back'
)

export const updateUserExtraReducers = userSessionExtraReducerCreator(
  updateUser,
  'User Updated!',
  true
)
