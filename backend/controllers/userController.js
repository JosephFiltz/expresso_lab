//user authentication library using JWT
import jwt from 'jsonwebtoken'
//allows hashing of passwords
import bcrypt from 'bcryptjs'
//middleware for handling exceptions inside async express routes
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//desc    register new user
//route   POST /api/users
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
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid, user not found')
  }
})

//desc    get a user
//route   GET /api/users/:id
//access  private admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  res.status(200).json(user)
})

//desc    get users
//route   GET /api/users
//access  private admin
const getUsers = asyncHandler(async (req, res) => {
  const pageNum = 5
  const page = Number(req.query.page) || 1

  const users = await User.find({})
    .sort({ isAdmin: -1, createdAt: 1 })
    .limit(pageNum)
    .skip(pageNum * (page - 1))

  const count = await User.count({})

  res.status(200).json({ users, page, pageNum: Math.ceil(count / pageNum) })
})

//desc    edit user
//route   PUT /api/users
//access  private
const editUser = asyncHandler(async (req, res) => {
  const { username, email, password, passwordOld } = req.body

  const user = await User.findById(req.user._id)

  if (
    user &&
    (await bcrypt.compare(passwordOld, user.password)) &&
    passwordOld !== ''
  ) {
    user.name = username || user.name
    user.email = email || user.email

    if (password !== '') {
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword || user.password
    }

    const savedUser = await user.save()

    res.status(200).json({
      _id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    })
  } else if (!user) {
    res.status(404).json({ message: 'Invalid, user not found' })
    throw new Error('Invalid, user not found')
  } else {
    res.status(400).json({ message: 'Invalid password' })
    throw new Error('Invalid credentials')
  }
})

//desc    delete a user
//route   DELETE /api/users/:id
//access  private admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    const id = user.id
    await user.remove()
    res.status(200).json({ message: `User ${id} removed` })
  } else {
    res.status(404)
    throw new Error('Invalid, user not found/already deleted')
  }
})

//desc    login user
//route   POST /api/users/login
//access  public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  //compare form password to user's hashed password
  if (
    user &&
    (await bcrypt.compare(password, user.password)) &&
    password !== ''
  ) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else if (!user) {
    res.status(404)
    throw new Error('Invalid, user not found')
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

//desc    get user data
//route   GET /api/users/me
//access  public
const getMe = asyncHandler(async (req, res) => {
  //user passed in through protect middleware
  res.status(200).json(req.user)
})

//desc    set user address
//route   POST /api/users/address
//access  private
const setAddress = asyncHandler(async (req, res) => {
  const { label, address1, address2, city, postalCode, country, phone } =
    req.body

  if (!label || !address1 || !city || !postalCode || !country) {
    res.status(400)
    throw new Error('Please add all required fields')
  }

  const user = await User.findById(req.user._id)

  if (user) {
    user.addresses.push({
      label,
      address1,
      address2,
      city,
      postalCode,
      country,
      phone,
    })

    await user.save()

    res.status(201).json(user.id)
  } else {
    res.status(400)
    throw new Error('Invalid, user not found')
  }
})

//desc    delete an address
//route   POST /api/users/address/:id
//access  private
const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.addresses.id(req.params.id).remove()

    await user.save()

    res.status(200).json({ message: `Address ${req.params.id} removed` })
  } else {
    res.status(400)
    throw new Error('Invalid, user not found')
  }
})

//desc    get user addresses
//route   GET /api/users/address
//access  private
const getAddresses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  res.status(200).json(user.addresses)
})

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

export {
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
}
