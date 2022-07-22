import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { selectPayment, resetCartParams } from '../features/cart/cartSlice'

const Payment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { items, address, isSuccess, isError, message } = useSelector(
    (state) => state.cart
  )

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

    if (!items.length) {
      navigate('/cart')
    }

    if (!Object.keys(address).length) {
      navigate('/addressSelection')
    }

    if (isSuccess) {
      dispatch(resetCartParams())
      navigate('/checkout')
    }
  }, [user, items, address, isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(selectPayment(paymentMethod))
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Payment
        </h1>

        <form
          onSubmit={onSubmit}
          className='flex flex-col justify-center items-center'
        >
          <label className='flex justify-center items-center gap-1 text-xl'>
            <input
              type='radio'
              id='stripe'
              name='stripe'
              value='stripe'
              onChange={onChange}
              checked={paymentMethod === 'stripe'}
            />
            Stripe
          </label>
          <label className='flex justify-center items-center gap-1 text-xl'>
            <input
              type='radio'
              id='other'
              name='other'
              value='other'
              onChange={onChange}
              checked={paymentMethod === 'other'}
            />
            Other (Payment confirmed by admin)
          </label>
          <button
            type='submit'
            className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
export default Payment
