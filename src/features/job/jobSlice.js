import { createSlice } from '@reduxjs/toolkit'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

export const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship']
export const statusOptions = ['pending', 'interview', 'declined']

const initialState = {
  isLoading: false,
  position: '',
  compagny: '',
  jobLocation: '',
  jobTypeOptions: jobTypeOptions,
  jobType: jobTypeOptions[0],
  statusOptions: statusOptions,
  status: statusOptions[0],
  isEditing: false,
  editJobId: '',
}

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { id, value } }) => {
      state[id] = value
    },
  },
  extraReducers: {},
})

export const { handleChange } = jobSlice.actions

export default jobSlice.reducer
