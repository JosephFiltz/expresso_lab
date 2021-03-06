import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUsers,
  resetUserList,
  resetUserPage,
  incrementUserPage,
  decrementUserPage,
} from '../features/authentication/authSlice'
import UserCard from '../components/UserCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const AdminUserList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { users, user, page, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    return () => {
      dispatch(resetUserList())
      dispatch(resetUserPage())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user || !user.isAdmin) {
      navigate('/')
    }

    dispatch(getUsers())
  }, [user, page, isError, message, dispatch, navigate])

  const incrementUserPageHandler = () => {
    dispatch(incrementUserPage())
  }

  const decrementUserPageHandler = () => {
    dispatch(decrementUserPage())
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          User List
        </h1>

        {users.length > 0 ? (
          <div>
            <div className='md:mx-8 flex justify-between items-center font-bold text-lg gap-2'>
              <h3 className='w-[40%] text-center'>name</h3>
              <h3 className='w-[40%] text-center'>email</h3>
              <h3 className='w-[15%] text-center'>admin</h3>
              <div className='w-[5%]'></div>
            </div>
            <div className='md:mx-8 flex flex-col'>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
            <ul className='mt-8 flex justify-center items-center gap-2'>
              <li>
                <button type='button' onClick={decrementUserPageHandler}>
                  <AiOutlineArrowLeft size={50} />
                </button>
              </li>
              <li className='text-xl'>{page}</li>
              <li>
                <button type='button' onClick={incrementUserPageHandler}>
                  <AiOutlineArrowRight size={50} />
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className='mx-8 flex justify-center items-center text-4xl'>
            no users
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminUserList
