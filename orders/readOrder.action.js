
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
        let {startDate,endDate,...otherdata} = filterData
        otherdata.softDelete=false
        if (filterData.startDate && filterData.endDate){
            otherdata.creationDate = {$gte: new Date(filterData.startDate),$lte: new Date(filterData.endDate)}
        }

        const orders = await Order.find(otherdata).select('-softDelete')

        if (orders.length === 0) {
            return null
        }

        return orders
    } catch (error) {
        return null
    } 

}


module.exports = {getOrder, getOrders}