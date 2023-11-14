require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error)=>console.error(error))
db.once('open',()=>console.log('connected to db'))

const subsrcibersRoutes = require('./routes/subscribers.js')
app.use('/subscribers',subsrcibersRoutes)

app.listen(3000, ()=>console.log('Server is running'))