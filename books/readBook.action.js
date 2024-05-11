const mongoose = require('mongoose')
const Book = require("./book.model")

async function getBook(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const book = await Book.findOne({ _id: id, softDelete: false }).select('-softDelete')

        if (!book) {
            console.log('Libro no encontrado')
            return null
        }

        console.log('Libro encontrado:', book)
        return book
    } catch (error) {
        console.error('Error al obtener libro:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

async function getBooks(filterData) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const books = await Book.find({ ...filterData, softDelete: false }).select('-softDelete')

        if (books.length === 0) {
            console.log('No se encontraron libros con el filtro especificado')
            return []
        }

        console.log('Libros encontrados:', books)
        return books
    } catch (error) {
        console.error('Error al obtener libros:', error)
        return []
    } finally {
        mongoose.disconnect()
    }
}



module.exports = {getBook, getBooks}