import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { Logo } from '.'
import { toggleSidebar } from '../features/user/userSlice'
import Wrapper from '../assets/wrappers/SmallSidebar'
import links from '../utils/links'

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
          <div className='nav-links'>
            {links.map((link) => {
              const { id, text, path, icon } = link

              return (
                <NavLink
                  key={id}
                  to={path}
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive && 'active'}`
                  }
                  onClick={toggle}
                >
                  <span className='icon'>{icon}</span>
                  {text}
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
