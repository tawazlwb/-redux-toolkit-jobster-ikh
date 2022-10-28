import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import {
  toggleSmallSidebar,
  toggleBigSidebar,
  logoutUser,
} from '../features/user/userSlice'
import { Logo } from '.'
import Wrapper from '../assets/wrappers/Navbar'
import { LARGE_WIDTH } from '../utils'

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const { user } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    const width = window.innerWidth

    if (width >= LARGE_WIDTH) {
      dispatch(toggleBigSidebar())
    } else {
      dispatch(toggleSmallSidebar())
    }
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type='button'
            className='btn'
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout && 'show-dropdown'}`}>
            <button type='button' className='dropdown-btn' onClick={logout}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
