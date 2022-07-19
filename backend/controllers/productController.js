import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//desc    get all products
//route   GET /api/products
//access  public
const getProducts = asyncHandler(async (req, res) => {
  const pageNum = 6
  const page = Number(req.query.page) || 1

  //grabs all products from collection into an array
  const products = await Product.find({})
    .sort({
      _id: -1,
    })
    .limit(pageNum)
    .skip(pageNum * (page - 1))

  const count = await Product.count({})

  res.status(200).json({ products, page, pageNum: Math.ceil(count / pageNum) })
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

//desc    get featured products
//route   GET /api/products/featured
//access  public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).sort({
    createdAt: -1,
  })

  res.status(200).json(products)
})

export { getProducts, getProduct, getFeaturedProducts }
