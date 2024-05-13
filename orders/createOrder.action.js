
const Order = require("./order.model")

async function createOrder(order) {
    try {

        const newOrder = new Order(order)

        await newOrder.save()

    } catch (error) {
        
    } 
}

module.exports = {createOrder}