
const Book = require("./book.model")

async function softDeleteBook(id) {
    try {
        

        const book = await Book.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!book) {
            
            return null
        }

        
        return book
    } catch (error) {
        
        return null
    } 
}

async function softDeleteBooks(ids) {
    try {
        const books = await Book.updateMany({ _id: { $in: ids }, softDelete: false }, { $set: { softDelete: true } }, { new: true }).select('-softDelete')

        if (!books) {
            return null
        }

        return books
    } catch (error) {
        return null
    }
}


module.exports = {softDeleteBook,softDeleteBooks}