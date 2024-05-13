const mongoose = require('mongoose')
const Order = require("./order.model")

async function getOrder(id) {
    try {
        

        const order = await Order.findOne({ _id: id, softDelete: false }).select('-softDelete')

        if (!order) {
            return null
        }

        return order
    } catch (error) {
        return null
    } 
}

async function getOrders(filterData) {
    try {

        const books = await Order.find({ ...filterData, softDelete: false }).select('-softDelete')

        if (books.length === 0) {
            console.log('No se encontraron libros con el filtro especificado')
            return []
        }

        console.log('Libros encontrados:', books)
        return books
    } catch (error) {
        console.error('Error al obtener libros:', error)
        return []
    } 
}


module.exports = {getOrder, getOrders}