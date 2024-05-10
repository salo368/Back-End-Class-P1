const express = require('express');
const router = express.Router();


const getUsersGeneric = async () => {
  return [
    { id: 1, name: 'User 1', age: 25 },
    { id: 2, name: 'User 2', age: 30 },
    { id: 3, name: 'User 3', age: 28 }
  ];
};

const GetUser = async (req, res) => {
  try {
  
    const users = await getUsersGeneric();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

const PostUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const PatchUsers = async (req, res) => {
  try {
    res.status(200).json({ message: 'Users updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating users' });
  }
};

const DeleteUser = async (req, res) => {
  try {
    res.status(200).json({ message: `User deleted with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

router.get("/", GetUser);
router.post("/", PostUser);
router.patch("/", PatchUsers);
router.delete("/:id", DeleteUser);

module.exports = router;
