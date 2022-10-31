import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/axios'

const getAllJobsThunk = async (_, thunkAPI) => {
  let url = `/jobs`

  try {
    const response = await customFetch.get(url)
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

export const getAllJobsExtraReducer = () => {
  return {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  }
}
