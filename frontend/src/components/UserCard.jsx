import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser } from '../features/authentication/authSlice'
import { toast } from 'react-toastify'

const UserCard = ({ user }) => {
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth.user)

  const deleteUserHandler = () => {
    if (user._id === authUser._id) {
      toast.error('Cannot delete self')
    } else {
      dispatch(deleteUser(user._id))
    }
  }

  return (
    <div className='flex justify-between items-center border-b-2 border-dark  text-center py-4 gap-2'>
      <Link
        to={`/admin/users/${user._id}`}
        className='w-[40%] rounded-md bg-rose-gold md:text-lg'
      >
        <div className=''>{user.name}</div>
      </Link>

      <div className='w-[40%] rounded-md bg-rose-gold md:text-lg'>
        {user.email}
      </div>
      <div className='w-[15%] rounded-md bg-rose-gold md:text-lg'>
        {user.isAdmin ? 'yes' : 'no'}
      </div>
      <button
        type='button'
        onClick={deleteUserHandler}
        className='w-[5%] rounded-md bg-rose-gold md:text-lg'
      >
        X
      </button>
    </div>
  )
}
export default UserCard
