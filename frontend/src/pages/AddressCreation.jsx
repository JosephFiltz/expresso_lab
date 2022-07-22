import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setAddress, resetAuth } from '../features/authentication/authSlice'

const AddressCreation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    label: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  })

  const { label, address1, address2, city, postalCode, country, phone } =
    formData

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    return () => {
      dispatch(resetAuth())
    }
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/')
    }

    if (isSuccess) {
      dispatch(resetAuth())
      navigate('/addressSelection')
    }
  }, [user, isError, message, isSuccess, dispatch, navigate])

  //allow typing into forms
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //form submission
  const onSubmit = (e) => {
    e.preventDefault()

    const addressData = {
      label,
      address1,
      address2,
      city,
      postalCode,
      country,
      phone,
    }

    dispatch(setAddress(addressData))
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto mt-4 bg-white text-dark md:rounded-xl max-w-[1280px]'>
        <section className='font-logo font-bold italic text-4xl p-4 pb-8'>
          <h1>Add Address</h1>
        </section>

        <section>
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-center items-center'
          >
            <input
              className='border-b mb-4 w-[50%]'
              type='label'
              id='label'
              name='label'
              value={label}
              placeholder='Label'
              onChange={onChange}
              required
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='address1'
              id='address1'
              name='address1'
              value={address1}
              placeholder='Address (street)'
              onChange={onChange}
              required
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='address2'
              id='address2'
              name='address2'
              value={address2}
              placeholder='Address (apartment/complex)'
              onChange={onChange}
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='city'
              id='city'
              name='city'
              value={city}
              placeholder='City'
              onChange={onChange}
              required
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='postalCode'
              id='postalCode'
              name='postalCode'
              value={postalCode}
              placeholder='Postal Code'
              onChange={onChange}
              required
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='country'
              id='country'
              name='country'
              value={country}
              placeholder='Country'
              onChange={onChange}
              required
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='phone'
              id='phone'
              name='phone'
              value={phone}
              placeholder='Phone Number'
              onChange={onChange}
            />
            <button
              type='submit'
              className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
            >
              Add
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
export default AddressCreation
