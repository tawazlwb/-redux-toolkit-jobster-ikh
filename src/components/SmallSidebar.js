import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { Logo, NavLinks } from '.'
import { toggleSmallSidebar } from '../features/user/userSlice'
import Wrapper from '../assets/wrappers/SmallSidebar'

const SmallSidebar = () => {
  const { isSmallSidebarOpen } = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const toggle = () => {
    dispatch(toggleSmallSidebar())
  }

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isSmallSidebarOpen && 'show-sidebar'}`}
      >
        <div className='content'>
          <button className='close-btn' onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
