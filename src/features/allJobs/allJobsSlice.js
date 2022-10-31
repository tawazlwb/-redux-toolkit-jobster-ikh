import { createSlice } from '@reduxjs/toolkit'
import {
  allJobReducers,
  getAllJobs,
  getAllJobsExtraReducer,
  getStats,
  getStatsExtraReducer,
} from './thunk'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export { getAllJobs, getStats }

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    ...allJobReducers(),
  },
  extraReducers: {
    ...getAllJobsExtraReducer(),
    ...getStatsExtraReducer(),
  },
})

export const { showLoading, hideLoading } = allJobsSlice.actions

export default allJobsSlice.reducer
