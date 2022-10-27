import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'

export const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logo} alt='jobster logo' className='logo' />
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
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </main>
  )
}

export default Landing
