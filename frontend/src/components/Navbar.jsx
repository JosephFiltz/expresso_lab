import { RiArrowDropDownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <div className='px-8'>
      <ul className='text-dark text-xl font-montserrat hidden md:flex h-12 mx-auto bg-white rounded-xl shadow-sm justify-center items-center gap-4 max-w-[1280px] '>
        <Link to='/products'>
          <li className=''>Products</li>
        </Link>
        {user && (
          <Link to='/user'>
            <li className=''>User</li>
          </Link>
        )}
        {user && (
          <Link to='/orders/userOrders'>
            <li className=''>Orders</li>
          </Link>
        )}
        {user && user.isAdmin && (
          <li className='group h-full'>
            <div className='flex items-center h-full hover:border-b-2 hover:border-b-dark ease-in-out duration-100'>
              Admin
              <RiArrowDropDownLine size={25} />
            </div>
            <ul className='group-hover:block hidden absolute shadow-xl text-gray text-lg border-b-2 border-b-dark w-40'>
              <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
                <Link to='/admin/users'>User List</Link>
              </li>
              <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
                <Link to='/admin/orders'>Order List</Link>
              </li>
              <li className='bg-white px-2 ease-in-out duration-200 hover:text-dark'>
                <Link to='/admin/products'>Product List</Link>
              </li>
            </ul>
          </li>
        )}
      </ul>
    </div>
  )
}
export default Navbar
