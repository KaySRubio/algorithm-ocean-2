import { useAppContext } from '../context/useAppContext'
import { Routes, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Lesson from './Lesson'
import NavBar from './NavBar'
import Terms from './Terms'
import Footer from './Footer'

function Wrapper() {
  const { darkMode, liveMessage } = useAppContext();

  return (
    <div className={`wrapper ${darkMode ? 'theme-dark' : 'theme-light'}`}>
    <div className='sr-only' aria-live="polite" aria-atomic="true">
      {liveMessage && <p>{liveMessage}</p>}
    </div>
      <div className='content'>
        <NavBar />
        <div>
          <Routes>
            <Route path={''} element={<Home />} />
            <Route path={'/lesson/bubble'} element={<Lesson key={'Bubble'} sortType={'Bubble'} />} />
            <Route path={'/lesson/insertion'} element={<Lesson key={'Insertion'} sortType={'Insertion'} />} />
            <Route path={'/lesson/selection'} element={<Lesson key={'Selection'} sortType={'Selection'} />} />
            <Route path={'/about'} element={<About />} />
            <Route path={'/terms'} element={<Terms />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Wrapper
