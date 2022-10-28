import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { Logo } from '.'
import { toggleSidebar } from '../features/user/userSlice'
import Wrapper from '../assets/wrappers/SmallSidebar'

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <div className={`sidebar-container ${isSidebarOpen && 'show-sidebar'}`}>
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className='nav-links'>nav links</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
