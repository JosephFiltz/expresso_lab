import mongoose from 'mongoose'

const userAddressSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
})

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Please add email'],
    },
    password: {
      type: String,
      required: [true, 'Please add password'],
    },
    addresses: [{ type: userAddressSchema, required: false }],
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    //adds createdAt/updatedAt field to every document
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
