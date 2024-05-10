const mongoose = require('mongoose')
const Order = require("./order.model")

async function getOrder(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const order = await Order.findOne({ _id: id, softDelete: false }).select('-softDelete')

        if (!order) {
            console.log('Orden no encontrada')
            return null
        }

        console.log('Orden encontrada:', order)
        return order
    } catch (error) {
        console.error('Error al obtener orden:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

async function getOrders(identifier, type) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        let filter = {}
        filter[identifier] = type

        const orders = await Order.find(filter)

        if (orders.length === 0) {
            console.log('No se encontraron ordenes con el filtro especificado')
            return []
        }

        console.log('Ordenes encontradas:', orders)
        return orders
    } catch (error) {
        console.error('Error al obtener ordenes:', error)
        return []
    } finally {
        mongoose.disconnect()
    }
}


module.exports = {getOrder, getOrders}