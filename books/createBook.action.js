const mongoose = require('mongoose')
const Book = require("./book.model")

async function createBook(book) {
    try {

        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const newBook = new Book(book)

        await newBook.save()

        console.log('Libro creado exitosamente')
    } catch (error) {
        console.error('Error al crear libro:', error)
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {createBook}