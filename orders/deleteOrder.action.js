
const Order = require("./order.model")

async function softDeleteOrder(id) {
    try {
        

        const order = await Order.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!order) {
            return null
        }

       
        return order
    } catch (error) {
        
        return null
    } 
}

module.exports = {softDeleteOrder}