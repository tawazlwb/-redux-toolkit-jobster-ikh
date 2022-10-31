import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChartsContainer, StatsContainer } from '../../components'
import Loading from '../../components/Loading'
import { getStats } from '../../features/allJobs/allJobsSlice'

const Stats = () => {
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStats())
  }, [dispatch])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length && <ChartsContainer />}
    </>
  )
}

export default Stats
