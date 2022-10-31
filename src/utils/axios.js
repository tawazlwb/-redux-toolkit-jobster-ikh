import axios from 'axios'
import { getUserFromLocalStorage } from './localStorage'

const url = 'https://jobify-prod.herokuapp.com/api/v1/toolkit'

const customFetch = axios.create({
  baseURL: url,
})

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage()

  if (user) {
    // config.headers.common['Authorization'] = `Bearer ${user.token}` // not working --> error
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
})

export default customFetch
