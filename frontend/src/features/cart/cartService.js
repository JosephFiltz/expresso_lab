import axios from 'axios'

const API_URL = '/api/products/'

//get item by id
const addToCart = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const cartService = {
  addToCart,
}

export default cartService
