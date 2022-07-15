import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineShopping } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { logout, resetAuth } from '../features/authentication/authSlice'
import { resetCart } from '../features/cart/cartSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //for checking if user is logged in
  const { user } = useSelector((state) => state.auth)

  //toggle mobile navbar
  const [nav, setNav] = useState(false)

  const toggleNav = () => {
    setNav(!nav)
  }

  const onLogout = () => {
    dispatch(logout())
    dispatch(resetAuth())
    dispatch(resetCart())
    navigate('/')
  }

  return (
    <header className='text-dark flex justify-between items-center h-24 px-8 mx-auto max-w-[1280px]'>
      <div className='flex items-center'>
        <div className='md:hidden'>
          <div className='pr-8 flex items-center'>
            <button onClick={toggleNav}>
              <AiOutlineMenu size={25}></AiOutlineMenu>
            </button>
          </div>
          {/*grayed out nav background*/}
          <span
            onClick={toggleNav}
            className={
              nav
                ? 'fixed top-0 bottom-0 left-0 right-0 h-full w-full bg-dark opacity-50'
                : ''
            }
          />
          {/*navbar*/}
          <div
            className={
              nav
                ? 'flex flex-col fixed left-0 top-0 w-[75%] h-full ease-in-out duration-300 border-r-2 border-r-white bg-dark text-white'
                : 'fixed left-[-75%] ease-out duration-300'
            }
          >
            <button onClick={toggleNav} className='p-8'>
              <AiOutlineMenu size={25}></AiOutlineMenu>
            </button>
            <ul className='pt-10 text-xl p-4 '>
              <Link to='/products'>
                <li className='p-4 border-b border-b-white'>Products</li>
              </Link>
              {user && (
                <Link to='/user'>
                  <li className='p-4 border-b border-b-white'>User</li>
                </Link>
              )}
              {user && (
                <Link to='/orders/userOrders'>
                  <li className='p-4 border-b border-b-white'>Orders</li>
                </Link>
              )}
            </ul>
            {user && user.isAdmin && (
              <ul className='pt-4 text-xl p-4 '>
                <li className='p-4 text-2xl font-logo'>Admin</li>
                <Link to='/admin/users'>
                  <li className='p-4 border-b border-b-white'>User List</li>
                </Link>
                <Link to='/admin/orders'>
                  <li className='p-4 border-b border-b-white'>Order List</li>
                </Link>
                <Link to='/admin/products'>
                  <li className='p-4 border-b border-b-white'>Product List</li>
                </Link>
              </ul>
            )}
          </div>
        </div>
        <Link
          to='/'
          className='whitespace-nowrap text-2xl md:text-4xl font-logo font-bold italic'
        >
          expresso_lab
        </Link>
      </div>
      <ul className='flex justify-center items-center text-md md:text-xl font-montserrat'>
        {/*user logged in*/}
        {user ? (
          <>
            <li>
              <Link
                to='/cart'
                className='flex items-center p-4 gap-1 ease-in-out duration-200 hover:text-gray-dark'
              >
                <AiOutlineShopping size={25} />
                Cart
              </Link>
            </li>
            <li>
              <button
                onClick={onLogout}
                className='flex items-center p-4 gap-1 ease-in-out duration-200 hover:text-gray-dark'
              >
                <GoSignOut size={25} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {/*user not logged in*/}
            <li>
              <Link
                to='/login'
                className='flex items-center p-4 gap-1 ease-in-out duration-200 hover:text-gray-dark'
              >
                <GoSignIn size={25} />
                Login
              </Link>
            </li>
            <li>
              <Link
                to='/register'
                className='flex items-center p-4 gap-1 ease-in-out duration-200 hover:text-gray-dark'
              >
                <FaRegUser size={25} /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
