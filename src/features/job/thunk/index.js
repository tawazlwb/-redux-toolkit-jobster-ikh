import { initialState } from '../jobInitialState'
import { createJob, createJobExtraReducer } from './createJobThunk'
import { deleteJob, deleteJobExtraReducer } from './deleteJobThunk'
import { editJob, editJobExtraReducer } from './editJobThunk'

export const createJobReducers = () => {
  return {
    handleChange: (state, { payload: { id, value } }) => {
      state[id] = value
    },
    clearValues: () => {
      return initialState
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        isEditing: true,
        ...payload,
      }
    },
  }
}

export {
  createJob,
  createJobExtraReducer,
  deleteJob,
  deleteJobExtraReducer,
  editJob,
  editJobExtraReducer,
}
