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

const orderService = {
  setOrder,
}

export default orderService
