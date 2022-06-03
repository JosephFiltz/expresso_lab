import { useState, useEffect } from 'react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    //re-enter password authentication
    password2: '',
  })

  const { name, email, password, password2 } = formData

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
