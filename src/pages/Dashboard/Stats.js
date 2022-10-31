import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../../features/allJobs/allJobsSlice'
import { store } from '../../store'

const Stats = () => {
  const { defaultStats, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])

  return <div>Stats</div>
}

export default Stats
