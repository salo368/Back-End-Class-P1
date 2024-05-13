const mongoose = require('mongoose')
const Order = require("./order.model")

async function createOrder(order) {
    try {

        const newOrder = new Order(order)

        await newOrder.save()

        console.log('Orden creada exitosamente')
    } catch (error) {
        console.error('Error al crear orden:', error)
    } 
}

module.exports = {createOrder}