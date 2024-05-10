const mongoose = require('mongoose')
const User = require("./user.model")

async function softDeleteUser(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const user = await User.findOneAndUpdate({ _id: id, softDelete: false }, { softDelete: true }, { new: true }).select('-softDelete')

        if (!user) {
            console.log('Usuario no encontrado')
            return null
        }

        console.log('Usuario eliminado:', user)
        return user
    } catch (error) {
        console.error('Error al eliminar usuario:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {softDeleteUser}