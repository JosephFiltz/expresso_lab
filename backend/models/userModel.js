import mongoose from 'mongoose'

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
    isAdmin: {
      type: String,
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
