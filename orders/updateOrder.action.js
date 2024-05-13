
const Order = require("./order.model")

async function updateOrder(id, updatedOrder) {
    try {

        const order = await Order.findOneAndUpdate({ _id: id, softDelete: false }, updatedOrder, { new: true }).select('-softDelete')

        if (!order) {
            return null
        }

        
        return order
    } catch (error) {
        console.error('Error al actualizar orden:', error)
        return null
    } 
}

module.exports = {updateOrder}