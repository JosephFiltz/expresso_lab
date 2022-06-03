import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    //try connection
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    //failed connection
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
