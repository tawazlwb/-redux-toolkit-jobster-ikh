import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../../utils/axios'
import {
  getAllJobs,
  hideLoading,
  showLoading,
} from '../../allJobs/allJobsSlice'
import { jobUrl } from '../constants'
import { authHeader } from './authHeader'

const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())

  try {
    const options = authHeader(thunkAPI)
    const response = await customFetch.delete(`${jobUrl}/${jobId}`, options)
    thunkAPI.dispatch(getAllJobs())
    return response.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

export const deleteJobExtraReducer = () => {
  return {
    [deleteJob.fulfilled]: (_, { payload }) => {
      toast.success(payload)
    },
    [deleteJob.rejected]: (_, { payload }) => {
      toast.error(payload)
    },
  }
}
