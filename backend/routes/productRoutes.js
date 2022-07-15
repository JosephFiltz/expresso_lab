import express from 'express'
import {
  getProducts,
  getProduct,
  getFeaturedProducts,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

router.get('/', getProducts)
router.get('/featured', getFeaturedProducts)
router.get('/:id', getProduct)

export default router
