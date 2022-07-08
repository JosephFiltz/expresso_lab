import axios from 'axios'

const API_URL = '/api/orders/'

//add new order
const setOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/
  const response = await axios.post(API_URL, orderData, config)

  return response.data
}

//get user orders
const getUserOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/userOrders
  const response = await axios.get(API_URL + '/userOrders', config)

  return response.data
}

//admin: get a user's orders
const getUserIdOrders = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/userOrders
  const response = await axios.get(API_URL + '/userOrders/' + id, config)

  return response.data
}

//get one order by id
const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/:id
  const response = await axios.get(API_URL + id, config)

  return response.data
}

//set order paid
const setOrderPaid = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/:id/pay
  const response = await axios.put(API_URL + id + '/pay', {}, config)

  return response.data
}

//set order delivered
const setOrderDelivered = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/orders/:id/deliver
  const response = await axios.put(API_URL + id + '/deliver', {}, config)

  return response.data
}

const orderService = {
  setOrder,
  getUserOrders,
  getUserIdOrders,
  getOrder,
  setOrderPaid,
  setOrderDelivered,
}

export default orderService
