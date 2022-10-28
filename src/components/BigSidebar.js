import { useSelector } from 'react-redux'
import { Logo, NavLinks } from '.'
import Wrapper from '../assets/wrappers/BigSidebar'

const BigSidebar = () => {
  const { isBigSidebarOpen } = useSelector((store) => store.user)

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${isBigSidebarOpen && 'show-sidebar'}`}
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
