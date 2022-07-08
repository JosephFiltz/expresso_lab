import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { resetAuth, editUser } from '../features/authentication/authSlice'

const UserDetails = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    passwordOld: '',
  })

  const { username, email, password, password2, passwordOld } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [edit, setEdit] = useState(false)

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (!user) {
      navigate('/')
    }

    return () => {
      if (isError) {
        toast.error(message)
      }
      dispatch(resetAuth())
    }
  }, [user, isSuccess, isError, message, dispatch, navigate])

  const toggleEdit = () => {
    setEdit(!edit)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      //register user
      const userData = {
        username,
        email,
        password,
        passwordOld,
      }

      dispatch(editUser(userData))
    }

    setFormData({
      username: '',
      email: '',
      password: '',
      password2: '',
      passwordOld: '',
    })
  }

  return (
    <div className='md:mx-8'>
      <div className='md:mx-auto my-4 py-4 bg-white md:rounded-xl text-dark max-w-[1280px]'>
        <h1 className='font-logo font-bold italic text-auto text-xl md:text-4xl p-4 px-8'>
          User Details
        </h1>

        {/*User*/}
        <div className='flex flex-col justify-center items-center py-8 border-y-2'>
          <div className='font-logo text-2xl font-bold underline'>User</div>
          <div className='text-xl'>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
          </div>
        </div>

        {/*Edit User Form*/}
        {edit ? (
          <section className='mt-8'>
            <form
              onSubmit={onSubmit}
              className='flex flex-col justify-center items-center'
            >
              <h3 className='font-logo text-2xl font-bold underline mb-4'>
                Leave blank if not editting
              </h3>
              <input
                className='border-b mb-4 w-[50%]'
                type='username'
                id='username'
                name='username'
                value={username}
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
                placeholder='Enter new password'
                onChange={onChange}
              />
              <input
                className='border-b mb-4 w-[50%]'
                type='password'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm new password'
                onChange={onChange}
              />
              <input
                className='border-b w-[50%]'
                type='password'
                id='passwordOld'
                name='passwordOld'
                value={passwordOld}
                placeholder='Confirm old password'
                onChange={onChange}
              />

              <ul className='flex justify-center items-center gap-2'>
                <li className='flex justify-center items-center gap-2'>
                  <button
                    type='button'
                    onClick={toggleEdit}
                    className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                  >
                    Abort
                  </button>
                </li>
                <li>
                  <button
                    type='submit'
                    className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
                  >
                    Submit
                  </button>
                </li>
              </ul>
            </form>
          </section>
        ) : (
          <ul className='flex justify-center items-center gap-2'>
            <button
              type='button'
              onClick={toggleEdit}
              className='my-8 py-2 w-36 rounded-md bg-dark border-dark border text-white font-bold text-xl hover:bg-white hover:text-dark ease-in-out duration-300'
            >
              Edit User
            </button>
          </ul>
        )}
      </div>
    </div>
  )
}
export default UserDetails
