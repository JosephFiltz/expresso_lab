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
    tasting_notes: [
      {
        type: String,
        required: true,
      },
    ],
    roast_level: {
      type: String,
      required: true,
    },
    coffee_process: [
      {
        type: String,
        required: true,
      },
    ],
    coffee_origin: [
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
    stock_ounces: {
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
