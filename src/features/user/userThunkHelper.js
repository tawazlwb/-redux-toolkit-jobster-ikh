import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { logoutUser } from './userSlice'
import { addUserToLocalStorage } from '../../utils/localStorage'

export const isUpdate = (method) => {
  return method === 'put' || method === 'patch'
}

export const getCustomFetch = (url, user, method, options) => {
  if (method === 'post' || isUpdate(method)) {
    return customFetch[method](url, user, options)
  }

  return customFetch[method](url, options)
}

export const userAsyncThunkPayloadCreator =
  (url, method) => async (user, thunkAPI) => {
    try {
      const response = await getCustomFetch(url, user, method)
      return response.data
    } catch (error) {
      if (error.response.status === 401 && isUpdate(method)) {
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
