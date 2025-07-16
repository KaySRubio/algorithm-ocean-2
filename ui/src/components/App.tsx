import Wrapper from './Wrapper'
import { AppProvider } from '../context/appContext'

function App() {
  return (
    <AppProvider>
      <Wrapper />
    </AppProvider>
  )
}

export default App
