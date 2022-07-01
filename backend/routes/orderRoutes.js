import express from 'express'
import { setOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

router.post('/', protect, setOrder)

export default router
