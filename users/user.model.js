const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    books: [mongoose.Schema.Types.ObjectId],
    receivedOrders: [mongoose.Schema.Types.ObjectId],
    sentOrders: [mongoose.Schema.Types.ObjectId],
    softDelete: { type: Boolean, default: false }
}, { versionKey: false })


const User = mongoose.model('User', userSchema, 'users') 

async function createUser(user) {
    try {

        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const newUser = new User(user)

        await newUser.save()

        console.log('Usuario creado exitosamente')
    } catch (error) {
        console.error('Error al crear usuario:', error)
    } finally {
        mongoose.disconnect()
    }
}

async function getUserByEmail(email) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const user = await User.findOne({ email, softDelete: false }).select('-softDelete')

        if (!user) {
            console.log('Usuario no encontrado')
            return null
        }

        console.log('Usuario encontrado:', user)
        return user
    } catch (error) {
        console.error('Error al obtener usuario por correo electrónico:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

async function getUserById(id) {
    try {
        await mongoose.connect('mongodb+srv://salomonAdmin:o3Iw3Q9TpK09rSNU@backendclass.4l7vjkd.mongodb.net/backEndClass',{
            dbName: 'backEndClass' 
        })

        const user = await User.findById({ _id: id, softDelete: false }).select('-softDelete')

        if (!user) {
            console.log('Usuario no encontrado')
            return null
        }

        console.log('Usuario encontrado:', user)
        return user
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error)
        return null
    } finally {
        mongoose.disconnect()
    }
}

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

module.exports = { createUser, getUserByEmail, getUserById, updateUser, softDeleteUser }






