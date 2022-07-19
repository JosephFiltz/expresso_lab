import express from 'express'
//import user controller functions
import {
  registerUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
  loginUser,
  getMe,
  setAddress,
  deleteAddress,
  getAddresses,
} from '../controllers/userController.js'
//verify JWT when grabbing user data using protect middleware
import { protect, checkAdmin } from '../middleware/authMiddleware.js'

//routing handler class
const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/', protect, editUser)
router.get('/me', protect, getMe)
router.post('/address', protect, setAddress)
router.delete('/address/:id', protect, deleteAddress)
router.get('/address', protect, getAddresses)

//admin routes
router.get('/', protect, checkAdmin, getUsers)
router.get('/:id', protect, checkAdmin, getUser)
router.delete('/:id', protect, checkAdmin, deleteUser)
export default router
