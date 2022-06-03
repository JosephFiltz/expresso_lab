import { useState, useEffect } from 'react'
//useSelector: select from state eg. user, isLoading
//useDispatch: dispatch an action/function
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/authentication/authSlice'

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
    //fire error message if {isError = true} gotten from state
    if (isError) {
      toast.error(message)
    }

    //redirect home if successful registration
    if (isSuccess || user) {
      navigate('/')
    }

    //reset state
    dispatch(reset())
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
    <>
      <section>
        <h1>Create an account</h1>
      </section>

      <section>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            placeholder='Enter name'
            onChange={onChange}
          />
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            placeholder='Enter email'
            onChange={onChange}
          />
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            placeholder='Enter password'
            onChange={onChange}
          />
          <input
            type='password'
            id='password2'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
          />
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </>
  )
}
export default Register
