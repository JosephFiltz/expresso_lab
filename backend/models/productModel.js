import mongoose from 'mongoose'
const { ObjectId } = Schema.Types

const productSchema = mongoose.Schema(
  {
    //admins have the option to add products from frontend
    user: {
      type: ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: [
      {
        type: Number,
        required: true,
      },
    ],
    //final price: price * (1 - discount)
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    tastingNotes: [
      {
        type: String,
        required: true,
      },
    ],
    roastLevel: {
      type: String,
      required: true,
    },
    coffeeProcess: [
      {
        type: String,
        required: true,
      },
    ],
    coffeeOrigin: [
      {
        type: String,
        required: false,
      },
    ],
    size: [
      {
        type: String,
        required: true,
      },
    ],
    stockOunces: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
