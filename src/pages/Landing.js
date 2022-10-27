import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

export const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info  */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            8-bit cold-pressed tonx, raclette coloring book franzen neutra
            actually shabby chic photo booth snackwave kitsch. Chillwave ramps
            typewriter, man braid try-hard 3 wolf moon pok pok crucifix big mood
            selvage put a bird on it gatekeep iPhone unicorn hoodie
          </p>
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
