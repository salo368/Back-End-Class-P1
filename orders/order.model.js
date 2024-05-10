const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address: { type: String, required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    bookIds: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    status: { type: String, default: 'en progreso' },
    creationDate: { type: Date, default: Date.now },
    softDelete: { type: Boolean, default: false }
}, { versionKey: false });

const OrderModel = mongoose.model('Order', orderSchema, 'orders');

module.exports = OrderModel;
