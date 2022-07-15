import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  getOrder,
  resetOrder,
  setOrderPaid,
  setOrderDelivered,
} from '../features/orders/orderSlice'
import CartCard from '../components/CartCard'

const OrderDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const { user } = useSelector((state) => state.auth)
  const { order, isError, message } = useSelector((state) => state.order)

  const orderUser = { ...order.user }
  const address = { ...order.shippingAddress }
  const items = { ...order.items }

  useEffect(() => {
    return () => {
      dispatch(resetOrder())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    //get order by id from url
    if (!Object.keys(order).length) {
      dispatch(getOrder(params.id))
    }

    if (!user) {
      navigate('/')
    }
  }, [user, isError, message, params, dispatch, navigate])

  const setOrderPaidHandler = () => {
    dispatch(setOrderPaid(params.id))
  }

  const setOrderDeliveredHandler = () => {
    dispatch(setOrderDelivered(params.id))
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-auto text-xl md:text-4xl p-4 px-8'>
          Order {params.id}
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
          {order.isDelivered ? (
            <div className='mt-4 py-2 w-[50%] rounded-md bg-rose-gold font-bold text-lg text-center'>
              Delivered
            </div>
          ) : (
            <div className='mt-4 py-2 w-[50%] rounded-md bg-dark text-white font-bold text-lg text-center'>
              Not Delivered
            </div>
          )}
        </div>
        {/*Payment Method*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <div className='font-logo text-2xl font-bold underline'>
            Payment Method
          </div>
          <div className='text-xl'>{order.payment}</div>
          {order.isPaid ? (
            <div className='mt-4 py-2 w-[50%] rounded-md bg-rose-gold font-bold text-lg text-center'>
              Paid
            </div>
          ) : (
            <div className='mt-4 py-2 w-[50%] rounded-md bg-dark text-white font-bold text-lg text-center'>
              Not Paid
            </div>
          )}
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
        {/*Admin Controls*/}
        {user && user.isAdmin && (
          <ul className='flex justify-center items-center gap-8'>
            {!order.isPaid && (
              <li>
                <button
                  type='button'
                  onClick={setOrderPaidHandler}
                  className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                >
                  Set Paid
                </button>
              </li>
            )}
            {!order.isDelivered && (
              <li>
                <button
                  type='button'
                  onClick={setOrderDeliveredHandler}
                  className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                >
                  Set Delivered
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}
export default OrderDetails
