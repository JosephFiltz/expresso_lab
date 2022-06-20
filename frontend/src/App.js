//react routing handler
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ScrollToTop from './misc/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//import components
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
//import pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <>
      <div className={'min-h-screen'}>
        <Router>
          <ScrollToTop>
            <Header />
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/products/:id' element={<ProductPage />} />
            </Routes>
            <Footer />
          </ScrollToTop>
        </Router>

        <ToastContainer />
      </div>
    </>
  )
}
export default App
