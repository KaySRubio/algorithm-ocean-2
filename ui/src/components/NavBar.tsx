import { useState } from 'react'
import { useAppContext } from '../context/useAppContext'
import { Link } from 'react-router-dom'
import hamburgDark from '@/assets/png/hamburgDark.png'
import hamburgLight from '@/assets/png/hamburgLight.png'
import wave1 from '@/assets/png/wave1.png'
import wave2 from '@/assets/png/wave2.png'
import toggle1 from '@/assets/png/toggle1.png'
import toggle2 from '@/assets/png/toggle2.png'

const NavBar = () => {
  const [phoneMenuOpen, setPhoneMenuOpen] = useState<boolean>(false);
  const { darkMode, setDarkMode } = useAppContext();

  const changeTheme = () => {
    setDarkMode((prev: boolean) => !prev)
  }

  const openClosePhoneMenu = () => {
    setPhoneMenuOpen((prev: boolean) => !prev)
  }

  return (
    <header className={`navbar ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <div className='phone-only'>
        <button aria-label='Open menu' id="menuButton" onClick={openClosePhoneMenu}>
          <img src={darkMode ? hamburgDark : hamburgLight} className="hamburg" alt="A menu button"/>
        </button>
        <nav aria-label='Mobile Menu' className={phoneMenuOpen ? '' : 'hidden'} id='phoneDropdown' role='navigation'>
          <br />
          <Link className="link navbarlink phoneDropdownLink" to="/lesson/bubble">Bubble Sort</Link>
          <Link className="link navbarlink phoneDropdownLink" to="/lesson/insertion">Insertion Sort</Link>
          <Link className="link navbarlink phoneDropdownLink" to="/demo-lesson/selection">Selection Sort</Link>
          <Link className="link navbarlink phoneDropdownLink" to="/about">About</Link>
        </nav>
      </div>
      <div id="logo">
          <p><strong>AlgorithmOcean</strong></p>
          <img src={darkMode ? wave2 : wave1} className="logowave" title="blue wave" alt="Algorithm Ocean logo that looks like a blue ocean wave"/>
      </div>

      <button id="toggleButton" onClick={changeTheme}>
          <img src={darkMode ? toggle1 : toggle2} className="toggle" alt="A toggle switch that changes the background color from light to dark"/>
      </button>
      <nav aria-label='Menu' id='menurow1' role='navigation'>
        <Link className="link navbarlink" to="/">Home</Link>
        <Link className="link navbarlink" to="/about">About</Link>
      </nav>
    </header>
  )
}
export default NavBar