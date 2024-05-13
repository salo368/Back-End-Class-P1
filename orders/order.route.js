const express = require('express');

const router = express.Router();
const { tokenVerification } = require('../utils/authentication');
const {createNewOrder, updateOrderStatus} = require('./order.controller');

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
        const outValue = await getBookById(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const GetSenderOrders = async (req, res) => { 
    try {
        const outValue = await getBookById(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const GetReceiverOrders = async (req, res) => { 
    try {
        const outValue = await getBookById(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};

const DeleteOrder = async (req, res) => { 
    try {
        const outValue = await getBookById(req); 
        res.status(outValue.code).json(outValue.value);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
};


router.get("/", tokenVerification, GetOrder);
router.get("/send", tokenVerification, GetSenderOrders);
router.get("/receiver", tokenVerification, GetReceiverOrders);
router.post("/", tokenVerification, CreateOrder);
router.patch("/", tokenVerification, PatchOrder);
router.delete("/", tokenVerification, DeleteOrder);

module.exports = router;