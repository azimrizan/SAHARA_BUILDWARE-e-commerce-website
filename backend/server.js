import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app=express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())


app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

const razorpayConfig = {
    key: 'rzp_test_MDH1i553KmuDsg',

    // Other configuration options
  };
  

app.get('/api/config/razorpay',(req,res) =>{
    res.json(razorpayConfig);
})



const __dirname = path.resolve()
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

app.use(notFound)

app.use(errorHandler)

const PORT=process.env.PORT || 5000

app.get('/api/products', (req,res) => {
    res.json(products)
})

app.get('/api/products/:id', (req,res) => {
    const product=products.find(p => p._id=== req.params.id)
    res.json(product)
})




app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

