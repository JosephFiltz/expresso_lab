import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//desc    set order
//route   POST /api/order
//access  private
const setOrder = asyncHandler(async (req, res) => {
  const {
    items,
    address,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  const shippingAddress = {
    address1: address.address1,
    address2: address.address2,
    city: address.city,
    postalCode: address.postalCode,
    country: address.country,
    phone: address.phone,
  }

  if (items && items.length > 0) {
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    })

    if (order) {
      res.status(201).json(order)
    } else {
      res.status(400)
      throw new Error('Order not created')
    }
  } else {
    res.status(400)
    throw new Error('Cart is empty')
  }
})

//desc    get all orders of logged in user
//route   GET /api/orders/userOrders
//access  private
const getUserOrders = asyncHandler(async (req, res) => {
  const pageNum = 5
  const page = Number(req.query.page) || 1

  const orders = await Order.find({ user: req.user._id })
    .sort({
      createdAt: -1,
    })
    .limit(pageNum)
    .skip(pageNum * (page - 1))

  const count = await Order.count({ user: req.user._id })

  res.status(200).json({ orders, page, pageNum: Math.ceil(count / pageNum) })
})

//desc    get all orders of user by id
//route   GET /api/orders/userOrders/:id
//access  private admin
const getUserIdOrders = asyncHandler(async (req, res) => {
  const pageNum = 5
  const page = Number(req.query.page) || 1

  const orders = await Order.find({ user: req.params.id })
    .sort({
      createdAt: -1,
    })
    .limit(pageNum)
    .skip(pageNum * (page - 1))

  const count = await Order.count({ user: req.params.id })

  res.status(200).json({ orders, page, pageNum: Math.ceil(count / pageNum) })
})

//desc    get one order
//route   GET /api/orders/:id
//access  private
const getOrder = asyncHandler(async (req, res) => {
  //grab order by matching _id
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new error('Order not found')
  }
})

//desc    get newest order
//route   GET /api/orders/newest
//access  private
const getNewestOrder = asyncHandler(async (req, res) => {
  //grab order by matching _id
  const order = await Order.findOne(req.params.id)
    .sort({
      createdAt: -1,
    })
    .populate('user', 'name email')

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new error('Order not found')
  }
})

//desc    get all orders
//route   GET /api/orders/userOrders
//access  private admin
const getOrders = asyncHandler(async (req, res) => {
  const pageNum = 5
  const page = Number(req.query.page) || 1

  const orders = await Order.find({})
    .sort({
      createdAt: -1,
    })
    .limit(pageNum)
    .skip(pageNum * (page - 1))

  const count = await Order.count({})

  res.status(200).json({ orders, page, pageNum: Math.ceil(count / pageNum) })
})

//desc    set order to paid
//route   PUT /api/orders/:id/pay
//access  private
const setOrderPaid = asyncHandler(async (req, res) => {
  //grab order by matching _id
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidDate = Date.now()

    const savedOrder = await order.save()

    res.json(savedOrder)
  } else {
    res.status(404)
    throw new error('Order not found')
  }
})

//desc    set order to delivered
//route   PUT /api/orders/:id/delivered
//access  private
const setOrderDelivered = asyncHandler(async (req, res) => {
  //grab order by matching _id
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredDate = Date.now()

    const savedOrder = await order.save()

    res.json(savedOrder)
  } else {
    res.status(404)
    throw new error('Order not found')
  }
})

export {
  setOrder,
  getUserOrders,
  getUserIdOrders,
  getOrder,
  getNewestOrder,
  getOrders,
  setOrderPaid,
  setOrderDelivered,
}
