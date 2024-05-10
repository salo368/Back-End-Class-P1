const mongoose = require('mongoose')
const User = require("./user.model")

async function getUser(identifier, type) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        let query = {}

        if (type === 'email') {
            query = { email: identifier, softDelete: false }
        } else if (type === 'id') {
            query = { _id: identifier, softDelete: false }
        } else {
            console.log('Tipo de búsqueda no válido')
            return null
        }

        const user = await User.findOne(query).select('-softDelete')

        if (!user) {
            console.log('Usuario no encontrado')
            return null
        }

        console.log('Usuario encontrado:', user)
        return user
    } catch (error) {
        console.error('Error al obtener usuario:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {getUser}