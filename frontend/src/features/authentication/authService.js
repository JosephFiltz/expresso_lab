import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async (userData) => {
  //get response from server
  const response = await axios.post(API_URL, userData)

  //set user in local storage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//login user
const login = async (userData) => {
  // /api/users/login
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

//logout user
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
}

export default authService
