import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import { addUserToLocalStorage } from '../../utils/localStorage'

export const isTesting = false
export const registerUrl = isTesting
  ? '/auth/testingRegister'
  : '/auth/register'

export const userPayloadCreator = (url) => async (user, thunkAPI) => {
  try {
    const response = await customFetch.post(url, user)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const userSessionExtraReducerCreator = (
  asyncThunkActionCreator,
  message
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
      toast.success(`${message} ${user.name}`)
    },
    [asyncThunkActionCreator.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  }
}
