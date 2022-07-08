import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { resetOrder, getUserOrders } from '../features/orders/orderSlice'
import OrderCard from '../components/OrderCard'

const UserOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { orders, isError, message } = useSelector((state) => state.order)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    dispatch(getUserOrders())

    return () => {
      dispatch(resetOrder())
    }
  }, [user, isError, message, dispatch])

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
