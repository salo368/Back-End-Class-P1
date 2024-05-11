
const jwt = require('jsonwebtoken')
const {createBook} = require('./createBook.action')
const {updateBook} = require('./updateBook.action')
const {softDeleteBook} = require('./deleteBook.action')
const {getBook, getBooks} = require('./readBook.action')
const {getUser} = require('../users/readUser.action')

const BookModel = require("./book.model")

keyJWT="e3c6bedeefc5043740ecd268d679f522" //pasar a env

function tokenVerification(token) { //pasar a una carpeta de funciones
    try {
        
        return jwt.verify(token, keyJWT)
    } catch (error) {
        
        return undefined
    }
}

async function createNewBook(token,bookData) {
    try {
        
        const decodedToken = tokenVerification(token)
        if (!decodedToken) {
            throw new Error('Token inválido o expirado')
        }

        const userId = decodedToken.userId

        bookData.ownerId = userId

        const validationResult = await BookModel.validate(bookData)

        if (validationResult.error) {
            throw new Error(`Error de Validacion: ${validationResult.error.message}`)
        }

        const newBook = await createBook(bookData)
        
        return undefined
    } catch (error) {
        console.error('Error al crear el usuario:', error)
        throw error
    }
}

async function updateBookData(token, bookId ,newData) {
    try {
        const decodedToken = tokenVerification(token);

        if (!decodedToken) {
            throw new Error('Token inválido o expirado');
        }

        

        const bookSchemaKeys = Object.keys(BookModel.schema.obj);

        const newDataKeys = Object.keys(newData);
        const invalidKeys = newDataKeys.filter(key => !bookSchemaKeys.includes(key));

        if (invalidKeys.length > 0) {
            throw new Error(`Las siguientes keys no existen en el esquema de un Libro: ${invalidKeys.join(', ')}`);
        }

        // Si todas las keys son válidas, proceder con la actualización
        const updatedUser = await updateBook(bookId,newData);

        return updatedUser;
    } catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        throw error;
    }
}

async function getBooksList(token) {

    try {
    
        const decodedToken = tokenVerification(token)
        if (!decodedToken) {
            throw new Error('Token inválido o expirado')
        }

        const userId = decodedToken.userId

        const Books = await getBooks("ownerId", userId)

        console.log(Books)
        return Books
    } catch (error) {
        console.error('Error al obtener los libros:', error)
        throw error
    }

}
tokenn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjNlOTYyY2NkYzhhNDk2NzdiMGU1MDIiLCJpYXQiOjE3MTUzNzkyMTgsImV4cCI6MTcxNzk3MTIxOH0.ovWdbygWxJWVXjq8iFDukamTjyVciwlOtLtNqN3pzsw"

//getBooksList(tokenn)

createNewBook(tokenn, {
    "name": "One Piece",
    "genre": "Anime",
    "publicationYear": 1998,
    "publisher": "Shōnen Jump",
    "author": "Eiichiro Oda"
})