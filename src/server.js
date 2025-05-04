import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import dotEnv from 'dotenv'

import pinRoute from './routes/itens.js'
import userRoute from './routes/users.js'

dotEnv.config()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('📊 connected to db')
  })
  .catch((err) => {
    console.log(err.message)
  })

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/itens', pinRoute)
app.use('/api/users', userRoute)

app.listen(3333, () => {
  console.log(`💻 server running`)
})