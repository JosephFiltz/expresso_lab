import express from 'express'
import {
  setOrder,
  getUserOrders,
  getUserIdOrders,
  getOrder,
  setOrderPaid,
  setOrderDelivered,
} from '../controllers/orderController.js'
import { protect, checkAdmin } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

router.post('/', protect, setOrder)
router.get('/userOrders', protect, getUserOrders)
router.get('/:id', protect, getOrder)
router.put('/:id/pay', protect, setOrderPaid)
router.put('/:id/deliver', protect, setOrderDelivered)

//admin routes
router.get('/userOrders/:id', protect, checkAdmin, getUserIdOrders)

export default router
