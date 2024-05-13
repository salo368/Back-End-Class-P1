
const {createBook} = require('./createBook.action')
const {updateBook} = require('./updateBook.action')
const {softDeleteBook} = require('./deleteBook.action')
const {getBook, getBooks} = require('./readBook.action')
const {getUser } = require('../users/readUser.action')

async function createNewBook(req) {
    
    const {name,genre,publicationYear,publisher,author,price} = req.query

    if (!name || !genre || !publicationYear || !publisher || !author || !price) {
        return { value: { error: "Incomplete data" }, code: 400 }
    }
    req.query.ownerId = req.userId
    await createBook(req.query)
    return { value: {message: 'Book created successfully'}, code: 200 }
    
}

async function updateBookData(req) {
    
    const {name,genre,publicationYear,publisher,author,price,bookId} = req.query

    if (!bookId){
        return { value: { message: "No book id provided for modification" }, code: 404 }
    }

    if (!name && !genre && !publicationYear && !publisher && !author && !price) {
        return { value: { message: "No data provided for modification" }, code: 404 }
    }   

    const bookData = await getBook(bookId)

    if (!bookData){
        return { value: {message: 'Book Id does not exist'}, code: 404 }
    }

    if (bookData.ownerId != req.userId){
        return { value: {message: "Not user's book"}, code: 403 }
    }

    await updateBook(bookId,req.query)
    return { value: {message: 'Book updated successfully'}, code: 200 }

}

async function getBookById(req) {

    const {bookId} = req.query

    if (!bookId){
        return { value: { message: "No book id provided" }, code: 404 }
    }

    const bookData = await getBook(bookId)

    if (!bookData){
        return { value: {message: 'Book Id does not exist'}, code: 404 }
    }

    return { value: {bookData: bookData}, code: 200 }

}

async function getBooksUserList(req) {

    const {ownerId} = req.query

    if (!ownerId){
        return { value: { message: "No user id provided" }, code: 404 }
    }

    if (!await getUser(ownerId)){
        return { value: {message: 'User Id does not exist'}, code: 404 }
    }

    const books = await getBooks({ownerId: ownerId})

    if (!books){
        return { value: {message: "User does not have books"}, code: 200 }
    }else{
        return { value: {booksData: books}, code: 200 }
    }
    
}

async function getBooksListByFilter(req) {

    const {name,genre,publicationYear,publisher,author} = req.query
    
    if (!name && !genre && !publicationYear && !publisher && !author) {
        return { value: { message: "No data provided for modification" }, code: 404 }
    } 

    const filter = {}
    const keysToInclude = ['name', 'genre', 'publicationYear', 'publisher', 'author']
    keysToInclude.forEach(key => {
        if (req.query.hasOwnProperty(key)) {
            filter[key] = req.query[key]
        }
    })

    const books = await getBooks(filter)
    if (!books){
        return { value: {message: "There are no books with this filter"}, code: 200 }
    }else{
        return { value: {booksData: books}, code: 200 }
    }
    
}

async function deleteBook(req) {

    const {bookId} = req.query

    if (!bookId){
        return { value: { message: "No book id provided for modification" }, code: 404 }
    }

    const bookData = await getBook(bookId)

    if (!bookData){
        return { value: {message: 'Book Id does not exist'}, code: 404 }
    }

    if (bookData.ownerId != req.userId){
        return { value: {message: "Not user's book"}, code: 403 }
    }

    await softDeleteBook(bookId)
    return { value: {message: 'Book deleted successfully'}, code: 200 }

}

module.exports = {
    createNewBook,
    updateBookData,
    getBookById,
    getBooksUserList,
    deleteBook,
    getBooksListByFilter
}