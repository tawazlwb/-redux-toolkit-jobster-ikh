import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/axios'

const getJobStatsThunk = async (_, thunkAPI) => {
  try {
    const response = await customFetch.get('/jobs/stats')
    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const getStats = createAsyncThunk('allJobs/getStats', getJobStatsThunk)

export const getStatsExtraReducer = () => {
  return {
    [getStats.pending]: (state) => {
      state.isLoading = true
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.stats = payload.defaultStats
      state.monthlyApplications = payload.monthlyApplications
    },
    [getStats.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  }
}
