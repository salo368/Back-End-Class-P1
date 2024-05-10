const mongoose = require('mongoose')
const Order = require("./order.model")

async function createOrder(order) {
    try {

        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const newOrder = new Order(order)

        await newOrder.save()

        console.log('Orden creada exitosamente')
    } catch (error) {
        console.error('Error al crear orden:', error)
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {createOrder}