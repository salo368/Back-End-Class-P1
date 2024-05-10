const mongoose = require('mongoose')
const Order = require("./order.model")

async function updateOrder(id, updatedOrder) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const order = await Order.findOneAndUpdate({ _id: id, softDelete: false }, updatedOrder, { new: true }).select('-softDelete')

        if (!order) {
            console.log('Ordene no encontrada o ya eliminada')
            return null
        }

        console.log('Orden actualizada:', order)
        return order
    } catch (error) {
        console.error('Error al actualizar orden:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {updateOrder}