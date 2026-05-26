import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import AboutPage from './components/AboutPage.jsx'
import CompilerPage from './components/CompilerPage.jsx'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/compiler' element={<CompilerPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App;
