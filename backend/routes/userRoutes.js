import express from 'express'
//import user controller functions
import {
  registerUser,
  loginUser,
  getMe,
  setAddress,
  getAddresses,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

//user routes
router.post('/', registerUser)
router.post('/login', loginUser)
//verify JWT when grabbing user data using protect middleware
router.get('/me', protect, getMe)
router.post('/setAddress', protect, setAddress)
router.get('/getAddresses', protect, getAddresses)

export default router
