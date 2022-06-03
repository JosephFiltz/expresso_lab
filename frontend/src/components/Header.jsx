import { Link, useNavigate } from 'react-router-dom'
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/authentication/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header>
      <div>
        <Link to='/'>expresso lab</Link>
      </div>
      <ul>
        {/*user logged in*/}
        {user ? (
          <li>
            <button onClick={onLogout}>
              <GoSignIn />
              Logout
            </button>
          </li>
        ) : (
          <>
            {/*user not in*/}
            <li>
              <Link to='/login'>
                <GoSignIn />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaRegUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}
export default Header
