import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema.Types

const productSchema = mongoose.Schema(
  {
    //admins have the option to add products from frontend
    user: {
      type: ObjectId,
      ref: 'User',
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tastingNotes: [
      {
        type: String,
        required: false,
        default: null,
      },
    ],
    roastLevel: {
      type: String,
      required: false,
      default: null,
    },
    coffeeProcess: [
      {
        type: String,
        required: false,
        default: null,
      },
    ],
    coffeeOrigin: {
      type: String,
      required: false,
      default: null,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      required: false,
      default: false,
    },
    stripePrice: {
      type: String,
      required: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
