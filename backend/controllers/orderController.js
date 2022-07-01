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

export { setOrder }
