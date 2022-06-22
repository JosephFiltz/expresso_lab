import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, resetProduct } from '../features/products/productSlice'
import ProductCard from '../components/ProductCard'
import CartCard from '../components/CartCard'
import { resetCart } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()

  const { items, isError, message } = useSelector((state) => state.cart)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

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
              <h3 className='w-[38%]'>product</h3>
              <h3 className='w-[20%]'>price</h3>
              <h3 className='w-[20%]'>quantity</h3>
              <h3 className='w-[20%]'>subtotal</h3>
              <div className='w-[2%]' />
            </div>
            <div className='mx-8 flex flex-col'>
              {items.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>
            <ul className='flex justify-center items-center'>
              <button
                type='button'
                onClick={DeleteCart}
                className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
              >
                Delete Cart
              </button>
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
