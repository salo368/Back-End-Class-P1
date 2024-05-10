const express = require('express');
const router = express.Router();


const getUsersGeneric = async () => {
  return [
    { id: 1, name: 'Order 1', age: 25 },
    { id: 2, name: 'Order 2', age: 30 },
    { id: 3, name: 'Order 3', age: 28 }
  ];
};

const GetOrder = async (req, res) => {
  try {
  
    const users = await getUsersGeneric();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const PostOrder = async (req, res) => {
  try {
    res.status(200).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const PatchOrder = async (req, res) => {
  try {
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating users' });
  }
};

const DeleteOrder = async (req, res) => {
  try {
    res.status(200).json({ message: `Order deleted with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

router.get("/", GetOrder);
router.post("/", PostOrder);
router.patch("/", PatchOrder);
router.delete("/:id", DeleteOrder);

module.exports = router;
