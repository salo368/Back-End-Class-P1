const mongoose = require('mongoose')
const Book = require("./book.model")

async function softDeleteBook(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const book = await Book.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!book) {
            console.log('Libro no encontrado')
            return null
        }

        console.log('Libro eliminado:', book)
        return book
    } catch (error) {
        console.error('Error al eliminar libro:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {softDeleteBook}