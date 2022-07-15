import { useState, useEffect } from 'react'
//useSelector: select from state eg. user, isLoading
//useDispatch: dispatch an action/function
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, resetAuth } from '../features/authentication/authSlice'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    //re-enter password authentication
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  //select desired parts of auth state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    return () => {
      //reset state
      dispatch(resetAuth())
    }
  }, [dispatch])

  useEffect(() => {
    //fire error message if {isError = true} gotten from state
    if (isError) {
      toast.error(message)
    }

    //redirect home if successful registration
    if (isSuccess || user) {
      navigate('/')
    }
  }, [user, isError, isSuccess, message, navigate, dispatch])

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

    //password authentication
    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      //register user
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto mt-4 mx-auto bg-white text-dark md:rounded-xl max-w-[1280px]'>
        <section className='font-logo font-bold italic text-4xl p-4 pb-8'>
          <h1>Create an account</h1>
        </section>

        <section>
          <form
            onSubmit={onSubmit}
            className='flex flex-col justify-center items-center'
          >
            <input
              className='border-b mb-4 w-[50%]'
              type='text'
              id='name'
              name='name'
              value={name}
              placeholder='Enter name'
              onChange={onChange}
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='email'
              id='email'
              name='email'
              value={email}
              placeholder='Enter email'
              onChange={onChange}
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='password'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
            <input
              className='border-b mb-4 w-[50%]'
              type='password'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
            <button
              type='submit'
              className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
export default Register
