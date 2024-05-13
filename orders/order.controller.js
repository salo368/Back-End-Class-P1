
const {createOrder} = require('./createOrder.action')
const {updateOrder} = require('./updateOrder.action')
const {softDeleteOrder} = require('./deleteOrder.action')
const {getOrder, getOrders} = require('./readOrder.action')
const {getBooksByIds} = require('../books/readBook.action')
const {softDeleteBooks} = require('../books/deleteBook.action')


async function createNewOrder(req) {

    req.query.bookIds=req.body.bookIds
    const {address,senderId,bookIds} = req.query

    if (!address || !senderId || !bookIds) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }

    if (req.userId === senderId){
        return { value: { error: "Can't order to your self" }, code: 404 }
    }
    
    const booksData = await getBooksByIds(bookIds,senderId)
    
    if (!booksData){
        return { value: { error: "Invalid book id list" }, code: 403 }
    }

    req.query.receiverId = req.userId

    await createOrder(req.query)
    return { value: {message: 'Order created successfully'}, code: 200 }

}

async function updateOrderStatus(req){

    const {status, orderId} = req.query

    if (!status || !orderId ){
        return { value: { message: "Incomplete data" }, code: 400 }
    }

    if (!(status==="completado" || status==="cancelado")){
        return { value: { message: "Invalid order status" }, code: 400 }
    }

    const orderData = await getOrder(orderId)

    if (!(orderData.receiverId.toString()===req.userId || orderData.senderId.toString()===req.userId)){
        return { value: {message: "Not user's order"}, code: 403 }
    }

    if (status==="cancelado"){
        await updateOrder(orderId, {status: "cancelado"})
        return { value: {message: 'Order canceled successfully'}, code: 200 }
    }

    if (status==="completado" && orderData.receiverId.toString()===req.userId){
        return { value: {message: "Only owner can complete the order"}, code: 403 }
    }

    if (status==="completado" && orderData.senderId.toString()===req.userId){
        await updateOrder(orderId, {status: "completado"})

        await softDeleteBooks(orderData.bookIds)

        return { value: {message: 'Order completed'}, code: 200 }
    }
}

async function getOrderById(req){
 
    const {orderId} = req.query

    if ( !orderId ){
        return { value: { message: "No order id provided" }, code: 400 }
    }
    
    const orderData = await getOrder(orderId)

    if (!orderData){
        return { value: {message: 'Order Id does not exist'}, code: 404 }
    }

    return { value: {orderData: orderData}, code: 200 }
}

async function deleteOrder(req){

    const {orderId} = req.query

    if (!orderId){
        return { value: { message: "No order id provided for modification" }, code: 404 }
    }

    const orderData = await getOrder(orderId)

    if (!orderData){
        return { value: {message: 'Order Id does not exist'}, code: 404 }
    }

    if (!(orderData.receiverId.toString()===req.userId || orderData.senderId.toString()===req.userId)){
        return { value: {message: "Not user's order"}, code: 403 }
    }

    await softDeleteOrder(orderId)
    return { value: {message: 'Order deleted successfully'}, code: 200 }

}

async function getSendOrders(req){

    req.query.senderId = req.userId
    const {endDate,startDate} = req.query
    
    if ((!endDate && startDate) || (endDate && !startDate)){
        return { value: { message: "Both dates have to be provided" }, code: 404 }
    }

    const filter = {}
    const keysToInclude = ['senderId', 'status', 'endDate', 'startDate']
    keysToInclude.forEach(key => {
        if (req.query.hasOwnProperty(key)) {
            filter[key] = req.query[key]
        }
    })

    const ordersData = await getOrders(filter)

    if (!ordersData){
        return { value: {message: "There are no orders with this filter"}, code: 200 }
    }else{
        return { value: {ordersData: ordersData}, code: 200 }
    }

}

async function getReceiveOrders(req){

    req.query.receiverId = req.userId
    const {endDate,startDate} = req.query
    
    if ((!endDate && startDate) || (endDate && !startDate)){
        return { value: { message: "Both dates have to be provided" }, code: 404 }
    }

    const filter = {}
    const keysToInclude = ['receiverId', 'status', 'endDate', 'startDate']
    keysToInclude.forEach(key => {
        if (req.query.hasOwnProperty(key)) {
            filter[key] = req.query[key]
        }
    })

    const ordersData = await getOrders(filter)

    if (!ordersData){
        return { value: {message: "There are no orders with this filter"}, code: 200 }
    }else{
        return { value: {ordersData: ordersData}, code: 200 }
    }

}

module.exports = {
    createNewOrder,
    updateOrderStatus,
    getOrderById,
    deleteOrder,
    getSendOrders,
    getReceiveOrders
}