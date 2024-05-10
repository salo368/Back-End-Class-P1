const mongoose = require('mongoose')
const User = require("./user.model")

async function updateUser(id, updatedUser) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const user = await User.findOneAndUpdate({ _id: id, softDelete: false }, updatedUser, { new: true }).select('-softDelete')

        if (!user) {
            console.log('Usuario no encontrado o ya eliminado')
            return null
        }

        console.log('Usuario actualizado:', user)
        return user
    } catch (error) {
        console.error('Error al actualizar usuario:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

module.exports = {updateUser}