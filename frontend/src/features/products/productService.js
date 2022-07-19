import axios from 'axios'

const API_URL = '/api/products/'

//get all products
const getProducts = async (page) => {
  // /api/products/
  const response = await axios.get(API_URL + `?page=${page}`)

  return response.data
}

//get one product by id
const getProduct = async (id) => {
  // /api/products/:id
  const response = await axios.get(API_URL + id)

  return response.data
}

//get featured products
const getFeaturedProducts = async () => {
  // /api/products/featured
  const response = await axios.get(API_URL + 'featured')

  return response.data
}

//admin: delete product
const deleteProduct = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // /api/products/:id
  const response = await axios.delete(API_URL + id, config)

  return response.data
}

const productService = {
  getProducts,
  getProduct,
  getFeaturedProducts,
  deleteProduct,
}

export default productService
