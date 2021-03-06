import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, resetUserList } from '../features/authentication/authSlice'
import {
  getUserIdOrders,
  resetOrder,
  incrementOrderPage,
  decrementOrderPage,
} from '../features/orders/orderSlice'
import OrderCard from '../components/OrderCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const AdminUserDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { users, user, isError, message } = useSelector((state) => state.auth)
  const { orders, page } = useSelector((state) => state.order)

  useEffect(() => {
    return () => {
      dispatch(resetUserList())
      dispatch(resetOrder())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user || !user.isAdmin) {
      navigate('/')
    }

    dispatch(getUser(params.id))

    dispatch(getUserIdOrders(params.id))
  }, [user, page, isError, message, params, dispatch, navigate])

  const incrementOrderPageHandler = () => {
    dispatch(incrementOrderPage())
  }

  const decrementOrderPageHandler = () => {
    dispatch(decrementOrderPage())
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-auto text-xl md:text-4xl p-4 px-8'>
          User Details
        </h1>

        {/*User*/}
        <div className='flex flex-col justify-center items-center py-8 border-y-2'>
          <div className='font-logo text-2xl font-bold underline'>User</div>
          <div className='text-xl'>
            <div>Name: {users.name}</div>
            <div>Email: {users.email}</div>
          </div>
        </div>

        {/*User's orders*/}
        <div className='py-8 border-b-2'>
          <div className='text-center font-logo text-2xl font-bold underline'>
            Orders
          </div>
          {orders.length > 0 ? (
            <div>
              <div className='md:mx-8 flex flex-col'>
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          ) : (
            <div className='mx-8 flex justify-center items-center text-4xl'>
              no orders
            </div>
          )}
          <ul className='mt-8 flex justify-center items-center gap-2'>
            <li>
              <button type='button' onClick={decrementOrderPageHandler}>
                <AiOutlineArrowLeft size={50} />
              </button>
            </li>
            <li className='text-xl'>{page}</li>
            <li>
              <button type='button' onClick={incrementOrderPageHandler}>
                <AiOutlineArrowRight size={50} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default AdminUserDetails
