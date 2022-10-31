import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow } from '../components'
import { loginUser, registerUser } from '../features/user/userThunk'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value

    setValues((state) => ({
      ...state,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values

    if (!email || !password || (!isMember && !name)) {
      toast.warning('Please fill out all fields')
      return
    }

    if (isMember) {
      dispatch(loginUser({ email: email, password: password }))
      return
    }

    dispatch(registerUser({ name, email, password }))
  }

  const toggleMember = () => {
    setValues((state) => ({
      ...state,
      isMember: !state.isMember,
    }))
  }

  const loginDemoUser = () => {
    dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'login' : 'register'}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        {values.isMember && (
          <button
            type='button'
            className='btn btn-block btn-hipster'
            disabled={isLoading}
            onClick={loginDemoUser}
          >
            {isLoading ? 'loading...' : 'demo'}
          </button>
        )}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type='button'
            className='member-btn'
            disabled={isLoading}
            onClick={toggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
