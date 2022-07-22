import { useDispatch } from 'react-redux'
import { deleteAddress } from '../features/authentication/authSlice'
import { selectAddress } from '../features/cart/cartSlice'

const AddressCard = ({ address }) => {
  const dispatch = useDispatch()

  const selectAddressHandler = () => {
    dispatch(selectAddress(address))
  }

  const deleteAddressHandler = () => {
    dispatch(deleteAddress(address._id))
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-2xl underline'>{address.label}</div>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>{address.city}</div>
        <div>{address.postalCode}</div>
        <div>{address.country}</div>
        <div>{address.phone}</div>
      </div>
      <ul className='mt-4 flex justify-center items-center gap-2'>
        <li>
          <button
            type='button'
            onClick={selectAddressHandler}
            className='w-20 rounded-md bg-dark border-dark border text-white font-bold text-lg hover:bg-white hover:text-dark ease-in-out duration-300'
          >
            Select
          </button>
        </li>
        <li>
          <button
            type='button'
            onClick={deleteAddressHandler}
            className='w-20 rounded-md bg-dark border-dark border text-white font-bold text-lg hover:bg-white hover:text-dark ease-in-out duration-300'
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  )
}
export default AddressCard
