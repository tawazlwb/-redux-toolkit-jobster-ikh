import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import customFetch from '../../utils/axios'
import { toast } from 'react-toastify'
import { logoutUser } from '../user/userSlice'
import { getUserFromLocalStorage } from '../../utils/localStorage'

export const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship']
export const statusOptions = ['pending', 'interview', 'declined']

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: getUserFromLocalStorage()?.location || '',
  jobTypeOptions: jobTypeOptions,
  jobType: jobTypeOptions[0],
  statusOptions: statusOptions,
  status: statusOptions[0],
  isEditing: false,
  editJobId: '',
}

export const createJobUrl = '/jobs'

export const createJob = createAsyncThunk(
  'job/createJob',
  async (job, thunkAPI) => {
    try {
      const options = {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      }
      const response = await customFetch.post(createJobUrl, job, options)
      thunkAPI.dispatch(clearValues())
      return response.data
    } catch (error) {
      console.log(error)
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser())
        return thunkAPI.rejectWithValue('Unauthorized! Logging Out...')
      }

      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { id, value } }) => {
      state[id] = value
    },
    clearValues: () => {
      return initialState
    },
  },
  extraReducers: {
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
  },
})

export const { handleChange, clearValues } = jobSlice.actions

export default jobSlice.reducer
