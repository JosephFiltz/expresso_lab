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
import UserDetails from './pages/UserDetails'
import Products from './pages/Products'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import AddressSelection from './pages/AddressSelection'
import AddressCreation from './pages/AddressCreation'
import Payment from './pages/Payment'
import Checkout from './pages/Checkout'
import OrderDetails from './pages/OrderDetails'
import UserOrders from './pages/UserOrders'
import AdminUserList from './pages/AdminUserList'
import AdminUserDetails from './pages/AdminUserDetails'
import AdminOrderList from './pages/AdminOrderList'
import AdminProductList from './pages/AdminProductList'

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
              <Route path='/user' element={<UserDetails />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:id' element={<ProductPage />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/addressSelection' element={<AddressSelection />} />
              <Route path='/addressCreation' element={<AddressCreation />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/orders/:id' element={<OrderDetails />} />
              <Route path='/orders/userOrders' element={<UserOrders />} />
              <Route path='/admin/users' element={<AdminUserList />} />
              <Route path='/admin/users/:id' element={<AdminUserDetails />} />
              <Route path='/admin/orders' element={<AdminOrderList />} />
              <Route path='/admin/products' element={<AdminProductList />} />
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
