import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  getNewestOrder,
  resetOrder,
  setOrderPaid,
} from '../features/orders/orderSlice'
import { resetCart } from '../features/cart/cartSlice'
import CartCard from '../components/CartCard'

const CheckoutSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { order, isError, message } = useSelector((state) => state.order)

  const orderUser = { ...order.user }
  const address = { ...order.shippingAddress }
  const items = { ...order.items }

  useEffect(() => {
    return () => {
      dispatch(resetOrder())
      dispatch(resetCart())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //get order by id from url
    if (!Object.keys(order).length) {
      dispatch(getNewestOrder())
    }

    if (!order.isPaid && order.payment === 'stripe') {
      dispatch(setOrderPaid(order._id))
    }

    if (!user) {
      navigate('/')
    }
  }, [user, isError, message, order, dispatch, navigate])

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Your Order is in!
        </h1>

        {/*User*/}
        <div className='flex flex-col justify-center items-center py-8 border-y-2'>
          <div className='font-logo text-2xl font-bold underline'>User</div>
          <div className='text-xl'>
            <div>Name: {orderUser.name}</div>
            <div>Email: {orderUser.email}</div>
          </div>
        </div>
        {/*Address*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <div className='font-logo text-2xl font-bold underline'>Address</div>
          <div>{address.address1}</div>
          <div>{address.address2}</div>
          <div>{address.city}</div>
          <div>{address.postalCode}</div>
          <div>{address.country}</div>
          <div>{address.phone}</div>
        </div>
        {/*Payment Method*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <div className='font-logo text-2xl font-bold underline'>
            Payment Method
          </div>
          <div className='text-xl'>{order.payment}</div>
        </div>
        {/*Products*/}
        <div className='py-8 border-b-2'>
          <div className='text-center font-logo text-2xl font-bold underline'>
            Products
          </div>
          <div className='mx-8 mb-2 flex justify-between items-center font-bold text-lg'>
            <h3 className='w-[50%]'>product</h3>
            <h3 className='w-[15%]'>price</h3>
            <h3 className='w-[18%]'>quantity</h3>
            <h3 className='w-[15%]'>subtotal</h3>
          </div>
          <div className='mx-8 flex flex-col'>
            {Object.entries(items).map(([key, value], i) => (
              <CartCard key={i} item={value} />
            ))}
          </div>
        </div>
        {/*Final Pricing*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <div className='font-logo text-2xl font-bold underline'>
            Order Price
          </div>
          <div className='flex flex-col gap-1'>
            <div>Products: ${order.itemsPrice}</div>
            <div>Shipping: ${order.shippingPrice}</div>
            <div>Tax: ${order.taxPrice}</div>
            <div className='text-xl font-bold p-2 rounded-md bg-rose-gold'>
              Total: ${order.totalPrice}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutSuccess
