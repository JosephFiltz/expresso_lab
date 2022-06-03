import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/authentication/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    //fire error message if {isError = true} gotten from state
    if (isError) {
      toast.error(message)
    }

    //redirect home if successful login
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

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <>
      <section>
        <h1>Login</h1>
      </section>

      <section>
        <form onSubmit={onSubmit}>
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
          <button type='submit' className='btn btn-block'>
            Submit
          </button>
        </form>
      </section>
    </>
  )
}
export default Login
