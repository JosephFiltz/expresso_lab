import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'
import { AiOutlineMenu } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { logout, resetAuth } from '../features/authentication/authSlice'

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
    navigate('/')
  }

  return (
    <header className='text-dark flex justify-between items-center h-24 px-8 mx-auto max-w-[1280px]'>
      <div className='flex items-center'>
        <div className='md:hidden'>
          <div className='pr-8'>
            <btn onClick={toggleNav}>
              <AiOutlineMenu size={25}></AiOutlineMenu>
            </btn>
          </div>
          <btn
            onClick={toggleNav}
            className={
              nav
                ? 'fixed top-0 bottom-0 left-0 right-0 h-full w-full bg-dark opacity-50'
                : ''
            }
          ></btn>
          <div
            className={
              nav
                ? 'flex flex-col fixed left-0 top-0 w-[75%] h-full ease-in-out duration-300 border-r-2 border-r-white bg-dark text-white'
                : 'fixed left-[-75%] ease-out duration-300'
            }
          >
            <btn onClick={toggleNav} className='p-8'>
              <AiOutlineMenu size={25}></AiOutlineMenu>
            </btn>
            <ul className='pt-20 text-xl p-4 '>
              <li className='p-4 border-b border-b-white'>hello</li>
              <li className='p-4 border-b border-b-white'>hello</li>
              <li className='p-4 border-b border-b-white'>hello</li>
              <li className='p-4 border-b border-b-white'>hello</li>
              <li className='p-4 border-b border-b-white'>hello</li>
            </ul>
          </div>
        </div>
        <Link
          to='/'
          className='whitespace-nowrap text-2xl md:text-4xl font-logo font-bold italic'
        >
          expresso_lab
        </Link>
      </div>
      <ul className='flex text-md md:text-xl font-montserrat'>
        {/*user logged in*/}
        {user ? (
          <li>
            <button onClick={onLogout}>
              <GoSignOut />
              Logout
            </button>
          </li>
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
