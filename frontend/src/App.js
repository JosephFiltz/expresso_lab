//react routing handler
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//import components
import Header from './components/Header'
//import pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
