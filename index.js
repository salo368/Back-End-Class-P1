const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose') 
const routesUsers = require('./users/user.route')
const routesBooks = require('./books/book.route')
const routesOrders = require('./orders/order.route')
require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@backendclass.4l7vjkd.mongodb.net/backEndClass`,{
  dbName: 'backEndClass' 
}).then(() => {
  console.log('Conexión exitosa a la base de datos')
}).catch((error) => {
  console.error('Error de conexión a la base de datos:', error)
})

app.use('/user', routesUsers)
app.use('/book', routesBooks)
app.use('/order', routesOrders)

app.listen(3000, () => {
  console.log(`Servidor escuchando en el puerto 3000`)
})
