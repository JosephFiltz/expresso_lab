import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import CartCard from '../components/CartCard'
import { resetCart, resetCartParams } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  const { items, isError, message } = useSelector((state) => state.cart)

  useEffect(() => {
    return () => {
      dispatch(resetCartParams())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }
  }, [user, isError, message, dispatch, navigate])

  const DeleteCart = () => {
    dispatch(resetCart())
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>Cart</h1>

        {items.length > 0 ? (
          <div>
            <div className='mx-8 mb-2 flex justify-between items-center font-bold text-lg'>
              <h3 className='w-[50%]'>product</h3>
              <h3 className='w-[15%]'>price</h3>
              <h3 className='w-[18%]'>quantity</h3>
              <h3 className='w-[15%]'>subtotal</h3>
              <div className='w-[2%]' />
            </div>
            <div className='mx-8 flex flex-col'>
              {items.map((item) => (
                <CartCard key={item.id} item={item} showDelete />
              ))}
            </div>
            <ul className='flex justify-center items-center gap-8'>
              <li>
                <button
                  type='button'
                  onClick={DeleteCart}
                  className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                >
                  Delete Cart
                </button>
              </li>
              <li>
                <Link
                  to='/addressSelection'
                  className='my-8 py-2 px-6 w-auto rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                >
                  Proceed to Checkout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className='mx-8 flex justify-center items-center text-4xl'>
            no items in cart
          </div>
        )}
      </div>
    </div>
  )
}
export default Cart
