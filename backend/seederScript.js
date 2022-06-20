import mongoose from 'mongoose'
import dotenv from 'dotenv'
import products from './data/products.js'
import Product from './models/productModel.js'
import connectDB from './config/database.js'
import colors from 'colors'

dotenv.config()
connectDB()

const importProducts = async () => {
  try {
    //delete all current products
    await Product.deleteMany()

    //add all products from data to collection
    await Product.insertMany(products)

    console.log('data imported')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

importProducts()
