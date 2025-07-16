import { Routes, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Lesson from './Lesson'
import NavBar from './NavBar'
import Terms from './Terms'
import Footer from './Footer'
import { AppProvider } from '../context/appContext'

function App() {
  return (
    <AppProvider>
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
        <Footer />
      </div>
    </AppProvider>
  )
}

export default App
