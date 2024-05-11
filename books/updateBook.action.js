const mongoose = require('mongoose')
const Book = require("./book.model")

async function updateBook(id, updatedBook) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })
        
        const book = await Book.findOneAndUpdate({ _id: id, softDelete: false }, updatedBook, { new: true }).select('-softDelete')

        if (!book) {
            console.log('Libro no encontrado o ya eliminado')
            return null
        }

        console.log('Libro actualizado:', book)
        return book
    } catch (error) {
        console.error('Error al actualizar libro:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {updateBook}