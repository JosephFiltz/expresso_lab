import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//desc    get all products
//route   GET /api/products
//access  public
const getProducts = asyncHandler(async (req, res) => {
  //grabs all products from collection into an array
  const products = await Product.find({})

  res.status(200).json(products)
})

//desc    get one product
//route   GET /api/products/:id
//access  public
const getProduct = asyncHandler(async (req, res) => {
  //grab product by matching _id
  const product = await Product.findById(req.params.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new error('Product not found')
  }
})

export { getProducts, getProduct }
