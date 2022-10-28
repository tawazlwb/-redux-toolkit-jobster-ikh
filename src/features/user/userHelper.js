import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from './userSlice'
import { addUserToLocalStorage } from '../../utils/localStorage'

export const isTesting = false
export const registerUrl = isTesting
  ? '/auth/testingRegister'
  : '/auth/register'
export const loginUrl = '/auth/login'
export const updateUserUrl = '/auth/updateUser'

export const getCustomFetch = (url, user, method, options) => {
  if (method === 'post' || method === 'put' || method === 'patch') {
    return customFetch[method](url, user, options)
  }

  return customFetch[method](url, options)
}

export const userPayloadCreator =
  (url, method, useToken, actions) => async (user, thunkAPI) => {
    try {
      const options = useToken
        ? {
            headers: {
              authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
              // authorization: `Bearer `,
            },
          }
        : {}
      const response = await getCustomFetch(url, user, method, options)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }

export const userSessionExtraReducerCreator = (
  asyncThunkActionCreator,
  message,
  hideUserName
) => {
  return {
    [asyncThunkActionCreator.pending]: (state) => {
      state.isLoading = true
    },
    [asyncThunkActionCreator.fulfilled]: (state, { payload }) => {
      const { user } = payload
      state.user = user
      addUserToLocalStorage(user)
      state.isLoading = false

      const msg = hideUserName ? message : `${message} ${user.name}`
      toast.success(msg)
    },
    [asyncThunkActionCreator.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  }
}
