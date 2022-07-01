import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import AddressCard from '../components/AddressCard'
import {
  getAddresses,
  resetAddress,
  resetAuth,
} from '../features/authentication/authSlice'
import { selectAddress, resetCartParams } from '../features/cart/cartSlice'

const AddressSelection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { addresses, isError, message } = useSelector((state) => state.auth)
  const { isSuccess } = useSelector((state) => state.cart)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getAddresses())

    if (isSuccess) {
      navigate('/payment')
    }

    dispatch(resetAuth())
    dispatch(resetAddress())
    dispatch(resetCartParams())
  }, [isError, isSuccess, message, dispatch, navigate])

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-4xl p-4 px-8'>
          Address Selection
        </h1>

        {addresses.length > 0 ? (
          <div>
            <div>
              {addresses.map((address, key) => (
                <div className='px-8 my-8 flex flex-col gap-8 justify-center items-center pb-8 border-b-2'>
                  <AddressCard key={key} address={address} />
                  <button
                    type='button'
                    onClick={() => {
                      dispatch(selectAddress(address))
                    }}
                    className='w-20 rounded-md bg-dark border-dark border text-white font-bold text-lg hover:bg-white hover:text-dark ease-in-out duration-300'
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
            <ul className='flex justify-center items-center gap-8'>
              <li>
                <Link
                  to='/addressCreation'
                  onClick={resetAuth()}
                  className='my-8 py-2 px-6 w-auto rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                >
                  Add an Address
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <div className='mx-8 flex flex-col justify-center items-center text-4xl'>
              <h3>Please add an address</h3>
              <Link
                to='/address'
                className='my-8 py-2 px-6 w-auto rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
              >
                Add an Address
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default AddressSelection
