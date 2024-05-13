const mongoose = require('mongoose')
const Book = require("./book.model")

async function createBook(book) {
    try {

        const newBook = new Book(book)

        await newBook.save()

    } catch (error) {
        
    } 
}

module.exports = {createBook}