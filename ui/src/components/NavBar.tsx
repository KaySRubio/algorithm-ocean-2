import { useAppContext } from '../context/useAppContext'
import { Link } from 'react-router-dom'
import wave1 from '@/assets/png/wave1.png'
import wave2 from '@/assets/png/wave2.png'
import toggle1 from '@/assets/png/toggle1.png'
import toggle2 from '@/assets/png/toggle2.png'

const NavBar = () => {
  const { darkMode, setDarkMode } = useAppContext();

  const changeTheme = () => {
    setDarkMode((prev: boolean) => !prev)
  }

  return (
    <header className={`navbar ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <div>
        <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          <img src={darkMode ? wave2 : wave1} className="logowave" title="blue wave" alt="Algorithm Ocean logo that looks like a blue ocean wave"/>
        </div>

        <button id="toggleButton" onClick={changeTheme}>
          <img src={darkMode ? toggle1 : toggle2} className="toggle" alt="A toggle switch that changes the background color from light to dark"/>
        </button>
      </div>
      <nav aria-label='Menu' id='menurow1' role='navigation'>
        <Link className="link navbarlink" to="/">Home</Link>
        <Link className="link navbarlink" to="/about">About</Link>
        <Link className="link navbarlink" to="/lesson/bubble">Bubble Sort</Link>
        <Link className="link navbarlink" to="/lesson/insertion">Insertion Sort</Link>
        <Link className="link navbarlink" to="/lesson/selection">Selection Sort</Link>
      </nav>
    </header>
  )
}
export default NavBar