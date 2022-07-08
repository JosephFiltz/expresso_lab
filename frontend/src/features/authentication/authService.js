import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async (userData) => {
  // /api/users/
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

//edit user
const editUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/
  const response = await axios.put(API_URL, userData, config)

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

  // /api/users/address
  const response = await axios.post(API_URL + 'address', addressData, config)

  return response.data
}

//add new address
const deleteAddress = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/address/:id
  const response = await axios.delete(API_URL + 'address/' + id, config)

  return response.data
}

//get user addresses
const getAddresses = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/address
  const response = await axios.get(API_URL + 'address', config)

  return response.data
}

//admin: get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/
  const response = await axios.get(API_URL, config)

  return response.data
}

//admin: get a user
const getUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/:id
  const response = await axios.get(API_URL + id, config)

  return response.data
}

//admin: delete user
const deleteUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/users/:id
  const response = await axios.delete(API_URL + id, config)

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
  editUser,
  setAddress,
  deleteAddress,
  getAddresses,
  getUser,
  getUsers,
  deleteUser,
}

export default authService
