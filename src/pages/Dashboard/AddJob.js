import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FormRow, FormRowSelect } from '../../components'
import { handleChange } from '../../features/job/jobSlice'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddJob = () => {
  const {
    isLoading,
    position,
    compagny,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job)
  const dispatch = useDispatch()

  const handleJobInput = (e) => {
    const id = e.target.id
    const value = e.target.value
    dispatch(handleChange({ id, value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !compagny || !jobLocation) {
      toast.error('Please fill out all fields')
      return
    }

    // dispatch(updateUser({ name, email, lastName, location }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        <div className='form-center'>
          {/* position field */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />

          {/* compagny field */}
          <FormRow
            type='text'
            name='compagny'
            value={compagny}
            handleChange={handleJobInput}
          />

          {/* jobLocation field */}
          <FormRow
            type='text'
            name='jobLocation'
            value={jobLocation}
            labelText='job location'
            handleChange={handleJobInput}
          />

          {/* status field */}
          <FormRowSelect
            name='status'
            value={status}
            options={statusOptions}
            handleChange={handleJobInput}
          />

          {/* jobType field */}
          <FormRowSelect
            name='jobType'
            value={jobType}
            options={jobTypeOptions}
            labelText='job type'
            handleChange={handleJobInput}
          />

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => console.log('clear values')}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block'
              disabled={isLoading}
            >
              {isLoading ? 'please wait...' : 'submit'}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
