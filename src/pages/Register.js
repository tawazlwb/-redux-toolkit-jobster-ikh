import { useState } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow } from '../components'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}
const Register = () => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    console.log(e.target.id)
    setValues((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>login</h3>
        {/* name field */}
        <FormRow
          type='text'
          name='name'
          value={values.name}
          labelText='name'
          handleChange={handleChange}
        />
        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          labelText='email'
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          labelText='password'
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Register
