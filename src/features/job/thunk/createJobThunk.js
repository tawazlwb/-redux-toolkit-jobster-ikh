import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/axios'
import { logoutUser } from '../../user/userSlice'
import { clearValues } from '../jobSlice'
import { jobUrl } from '../constants'
import authHeader from '../../../utils/authHeader'

const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post(jobUrl, job, authHeader(thunkAPI))
    thunkAPI.dispatch(clearValues())
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser())
      return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
    }

    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const createJob = createAsyncThunk('job/createJob', createJobThunk)

export const createJobExtraReducer = () => {
  return {
    [createJob.pending]: (state) => {
      state.isLoading = true
    },
    [createJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('Job Created')
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  }
}
