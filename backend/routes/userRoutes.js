import express from 'express'
//import user controller functions
import {
  registerUser,
  loginUser,
  getMe,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

//user routes
router.post('/', registerUser)
router.post('/login', loginUser)
//verify JWT when grabbing user data
router.get('/me', protect, getMe)

export default router
