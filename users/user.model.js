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


const UserModel = mongoose.model('User', userSchema, 'users')
module.exports = UserModel






