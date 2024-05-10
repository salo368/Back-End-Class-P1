const mongoose = require('mongoose')
const User = require("./user.model")

async function createUser(user) {
    try {

        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const newUser = new User(user)

        await newUser.save()

        console.log('Usuario creado exitosamente')
        return newUser
    } catch (error) {
        console.error('Error al crear usuario:', error)
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {createUser}