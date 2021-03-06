//"type": "module" in package.json allows importing like an ES module
import express from 'express'
//".env" holds local environment variables
import dotenv from 'dotenv'
//allows colored server logging
import colors from 'colors'
//import MongoDB databse
import connectDB from './config/database.js'

//import routes
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

//add environment variables and define port number
dotenv.config()
const port = process.env.PORT

//connect database
connectDB()

//initialize express
const app = express()

//for parsing json/urlencoded
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//add routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

//start server and listen for connections
app.listen(port, () =>
  console.log(`Server started on port ${port}`.yellow.italic)
)
