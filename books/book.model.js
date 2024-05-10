const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true  },
    publisher: { type: String, required: true },
    author: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    softDelete: { type: Boolean, default: false }
}, { versionKey: false })

const BookModel = mongoose.model('Book', bookSchema, 'books')

module.exports = BookModel
