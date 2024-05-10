const mongoose = require('mongoose')
const Order = require("./order.model")

async function softDeleteOrder(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const order = await Order.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!order) {
            console.log('Libro no encontrado')
            return null
        }

        console.log('Libro eliminado:', order)
        return order
    } catch (error) {
        console.error('Error al eliminar libro:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {softDeleteOrder}