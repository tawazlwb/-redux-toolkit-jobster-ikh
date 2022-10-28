import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value

    setUserData((state) => ({
      ...state,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userData

    if (!name || !email || !lastName || !location) {
      toast.error('Please fill out all fields')
      return
    }

    // dispatch(registerUser({ name, email, password }))
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          {/* name field */}
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            labelText='name'
            handleChange={handleChange}
          />
          {/* lastName field */}
          <FormRow
            type='text'
            name='lastName'
            value={userData.lastName}
            labelText='lastName'
            handleChange={handleChange}
          />
          {/* email field */}
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            labelText='email'
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            labelText='location'
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'please wait...' : 'submit'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
