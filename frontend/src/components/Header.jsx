import { Link, useNavigate } from 'react-router-dom'
import { GoSignIn, GoSignOut } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'

function Header() {
  return (
    <header>
      <div>expresso lab</div>
      <ul>
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
      </ul>
    </header>
  )
}
export default Header
