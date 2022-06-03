//user authentication library using JWT
import jwt from 'jsonwebtoken'
//allows hashing of passwords
import bcrypt from 'bcryptjs'
//middleware for handling exceptions inside async express routes
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//desc    register new user
//route   POST /api/user
//access  public
const registerUser = asyncHandler(async (req, res) => {
  //destructure variables from form
  const { name, email, password } = req.body

  //error if any fields empty
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  //email is unique
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
  }

  //hash password
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//desc    login user
//route   POST /api/user/login
//access  public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  //compare form password to user's hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//desc    get user data
//route   GET /api/user/me
//access  public
const getMe = asyncHandler(async (req, res) => {
  //user passed in through protect middleware
  const { _id, name, email } = await User.findById(req.user.id)

  //return user data
  res.status(200).json({
    id: _id,
    name,
    email,
  })
})

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export { registerUser, loginUser, getMe }
