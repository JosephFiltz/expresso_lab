import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import {
  resetCart,
  setItemsPrice,
  setShippingPrice,
  setTaxPrice,
  setTotalPrice,
} from '../features/cart/cartSlice'
import { setOrder, resetOrder } from '../features/orders/orderSlice'
import CartCard from '../components/CartCard'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  dispatch(setItemsPrice())
  dispatch(setShippingPrice())
  dispatch(setTaxPrice())
  dispatch(setTotalPrice())

  const { user } = useSelector((state) => state.auth)
  const {
    items,
    address,
    payment,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = useSelector((state) => state.cart)

  const { isSuccess, isError, message } = useSelector((state) => state.order)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    if (!items.length) {
      navigate('/cart')
    }

    if (!Object.keys(address).length) {
      navigate('/addressSelection')
    }

    if (!payment) {
      navigate('/payment')
    }

    if (isSuccess) {
      dispatch(resetCart())
      navigate('/')
    }

    dispatch(resetOrder())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const checkoutOrderHandler = () => {
    const data = {
      items,
      address,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    }

    dispatch(setOrder(data))
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Checkout
        </h1>
        {/*Address*/}
        <div className='flex flex-col justify-center items-center py-8 border-y-2'>
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
          <div className='text-xl'>{payment}</div>
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
            {items.map((item) => (
              <CartCard key={item.id} item={item} />
            ))}
          </div>
        </div>
        {/*Final Pricing*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <div className='font-logo text-2xl font-bold underline'>
            Order Price
          </div>
          <div className='flex flex-col gap-1'>
            <div>Products: ${itemsPrice}</div>
            <div>Shipping: ${shippingPrice}</div>
            <div>Tax: ${taxPrice}</div>
            <div className='text-xl font-bold p-2 rounded-md bg-rose-gold'>
              Total: ${totalPrice}
            </div>
          </div>
        </div>
        {/*Checkout button*/}
        <div className='flex flex-col justify-center items-center py-8 border-b-2'>
          <button
            type='button'
            onClick={checkoutOrderHandler}
            className='my-8 py-2 w-[50%] rounded-md bg-dark border-dark border text-white font-bold text-lg hover:bg-white hover:text-dark ease-in-out duration-300'
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}
export default Checkout
