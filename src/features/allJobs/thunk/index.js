import { getAllJobs, getAllJobsExtraReducer } from './getAllJobsThunk'
import { getStats, getStatsExtraReducer } from './getJobStatsThunk'

export const allJobReducers = () => {
  return {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
  }
}

export { getAllJobs, getAllJobsExtraReducer, getStats, getStatsExtraReducer }
