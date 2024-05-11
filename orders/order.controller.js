
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const {createOrder} = require('./createOrder.action')
const {updateOrder} = require('./updateOrder.action')
const {softDeleteOrder} = require('./deleteOrder.action')
const {getOrder, getOrders} = require('./readOrder.action')
const {getBooksByIds} = require('../books/readBook.action')

const OrderModel = require("./order.model")

keyJWT="e3c6bedeefc5043740ecd268d679f522" //pasar a env

function tokenVerification(token) { //pasar a una carpeta de funciones
    try {
        
        return jwt.verify(token, keyJWT)
    } catch (error) {
        
        return undefined
    }
}

async function createNewOrder(token,bookOwnerId,booksIds,orderData) {
    try {
        
        
        const decodedToken = tokenVerification(token)
        if (!decodedToken) {
            throw new Error('Token inválido o expirado')
        }

        try {
            booksData = getBooksByIds(booksIds)
        }catch (error) {
            throw new Error('Ids de libros invalida')
        }

        const userId = decodedToken.userId

        orderData.ownerId = userId
        
        const areAllOwnerIdsEqual = (bookOwnerId) => booksData.every(book => book.ownerId === bookOwnerId);

        if (!areAllOwnerIdsEqual) {
            throw new Error('Los libros no pertenecen al mismo dueño');
        }else{

            orderData.senderId = userId
            orderData.receiverId = bookOwnerId
            orderData.bookIds = booksIds

            const validationResult = await OrderModel.validate(orderData)
            
            if (validationResult.error) {
                throw new Error(`Error de Validacion: ${validationResult.error.message}`)
            }

            createOrder(orderData)
        }
        
        return undefined
    } catch (error) {
        console.error('Error al crear el usuario:', error)
        throw error
    }
}
tokenn2="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNlOTYyY2NkYzhhNDk2NzdiMGU1MDIiLCJpYXQiOjE3MTUzNzkyMTgsImV4cCI6MTcxNzk3MTIxOH0.ovWdbygWxJWVXjq8iFDukamTjyVciwlOtLtNqN3pzsw"
tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNmZGYzOGNmNjRhOTkwMjY2YWMzNDMiLCJpYXQiOjE3MTU0NjI0MDUsImV4cCI6MTcxODA1NDQwNX0.Zf8iy0Ut8y982zo1ceI6N5HVQB-kngDv945ww0GeMzE"

const functionNode = async () => {

    createNewOrder(tokenn,'663e962ccdc8a49677b0e502',["663eb67eae9063e46c5f53c9","663eab84a675d1ef6d5b1f1c"],{address:"mi casa"})
    //lista = await getBooksUserList(tokenn)
    //lista = await getBooksListByFilter({"genre": "Fiction, Dystopian"})
    // listtt = lista[5]
    // deleteBook(tokenn,listtt._id)
}

functionNode()