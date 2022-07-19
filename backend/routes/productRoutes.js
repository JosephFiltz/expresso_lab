import express from 'express'
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
  deleteProduct,
} from '../controllers/productController.js'
import { protect, checkAdmin } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

router.get('/', getProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:id', getProduct)

//admin routes
router.delete('/:id', protect, checkAdmin, deleteProduct)

export default router
