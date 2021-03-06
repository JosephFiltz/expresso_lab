import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetOrder,
  getUserOrders,
  incrementOrderPage,
  decrementOrderPage,
} from '../features/orders/orderSlice'
import OrderCard from '../components/OrderCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

const UserOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { orders, page, isError, message } = useSelector((state) => state.order)

  useEffect(() => {
    return () => {
      dispatch(resetOrder())
    }
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    dispatch(getUserOrders())
  }, [user, page, isError, message, dispatch])

  const incrementOrderPageHandler = () => {
    dispatch(incrementOrderPage())
  }

  const decrementOrderPageHandler = () => {
    dispatch(decrementOrderPage())
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>Orders</h1>

        {orders.length > 0 ? (
          <div>
            <div className='md:mx-8 flex flex-col'>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
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
        ) : (
          <div className='mx-8 flex justify-center items-center text-4xl'>
            no orders
          </div>
        )}
      </div>
    </div>
  )
}
export default UserOrders
