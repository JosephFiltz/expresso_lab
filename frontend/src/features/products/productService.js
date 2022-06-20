import axios from 'axios'

const API_URL = '/api/products/'

//get all products
const getProducts = async () => {
  const response = await axios.get(API_URL)

  return response.data
}

//get one product by id
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id)

  return response.data
}

const productService = {
  getProducts,
  getProduct,
}

export default productService
