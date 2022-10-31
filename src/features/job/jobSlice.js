import { createSlice } from '@reduxjs/toolkit'
import { initialState } from './jobInitialState'
import {
  createJobReducers,
  createJob,
  createJobExtraReducer,
  deleteJob,
  deleteJobExtraReducer,
  editJob,
  editJobExtraReducer,
} from './thunk'

export { createJob, deleteJob, editJob }

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    ...createJobReducers(),
  },
  extraReducers: {
    ...createJobExtraReducer(),
    ...deleteJobExtraReducer(),
    ...editJobExtraReducer(),
  },
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions

export default jobSlice.reducer
