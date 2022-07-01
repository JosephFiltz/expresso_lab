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

//add new address
const setAddress = async (addressData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/setAddress
  const response = await axios.post(API_URL + 'setAddress', addressData, config)

  return response.data
}

//get user addresses
const getAddresses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/getAddresses
  const response = await axios.get(API_URL + 'getAddresses', config)

  return response.data
}

//logout user, removing JWT token
const logout = async () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  login,
  logout,
  setAddress,
  getAddresses,
}

export default authService
