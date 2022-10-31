import { getUserFromLocalStorage } from '../../utils/localStorage'

export const jobTypeOptions = ['full-time', 'part-time', 'remote', 'internship']
export const statusOptions = ['pending', 'interview', 'declined']

export const initialState = {
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
