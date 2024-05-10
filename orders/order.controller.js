
const {createOrder} = require('./createOrder.action')
const {updateOrder} = require('./updateOrder.action')
const {softDeleteOrder} = require('./deleteOrder.action')
const {getOrder, getOrders} = require('./readOrder.action')
const {getUser} = require('../users/readUser.action')

const newOrder = {
    name: 'Salomon',
    lastname: 'Saenz',
    email: 'sdsaenz@example.com',
    password: '123456'
}

const testFunction = async () => {
    //const usuario = await getUser("sdsaenz@uninorte.edu.co", "email");
    const libros = await getOrders("name", "1984")
    const libro = libros[0]
    //console.log(libro)
    updateOrder(libro._id,{publicationYear:2024})
}

testFunction();