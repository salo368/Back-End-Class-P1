
const {createBook} = require('./createBook.action')
const {updateBook} = require('./updateBook.action')
const {softDeleteBook} = require('./deleteBook.action')
const {getBook, getBooks} = require('./readBook.action')
const {getUser} = require('../users/readUser.action')

const newBook = {
    name: 'Salomon',
    lastname: 'Saenz',
    email: 'sdsaenz@example.com',
    password: '123456'
};

const testFunction = async () => {
    //const usuario = await getUser("sdsaenz@uninorte.edu.co", "email");
    const libros = await getBooks("name", "1984")
    const libro = libros[0]
    //console.log(libro)
    updateBook(libro._id,{publicationYear:2024})
}


testFunction();