const express = require('express');

const router = express.Router();
const { tokenVerification } = require('../utils/authentication');
const {createNewOrder, updateOrderStatus, getOrderById, deleteOrder, getSendOrders, getReceiveOrders} = require('./order.controller');

const CreateOrder = async (req, res) => { 
    try {
        const outValue = await createNewOrder(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const PatchOrder = async (req, res) => { 
    try {
        const outValue = await updateOrderStatus(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const GetOrder = async (req, res) => { 
    try {
        const outValue = await getOrderById(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const GetSenderOrders = async (req, res) => { 
    try {
        const outValue = await getSendOrders(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const GetReceiverOrders = async (req, res) => { 
    try {
        const outValue = await getReceiveOrders(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const DeleteOrder = async (req, res) => { 
    try {
        const outValue = await deleteOrder(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching book' });
    }
};


router.get("/", tokenVerification, GetOrder);
router.get("/send", tokenVerification, GetSenderOrders);
router.get("/receive", tokenVerification, GetReceiverOrders);
router.post("/", tokenVerification, CreateOrder);
router.patch("/", tokenVerification, PatchOrder);
router.delete("/", tokenVerification, DeleteOrder);

module.exports = router;