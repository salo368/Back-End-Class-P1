const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { tokenVerification } = require('../utils/authentication');
const { login, signUp, updateUserData, deleteUser, getUserData} = require('./user.controller');

const LoginUser = async (req, res) => { //Por medio del Body
  try {
    const outValue = await login(req.body); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const PostUser = async (req, res) => { //Por medio del Body
  try {
    const outValue = await signUp(req.body); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const PatchUsers = async (req, res) => { //Por medio del Body
  try {
    const outValue = await updateUserData(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error updating users' });
  }
};

const DeleteUser = async (req, res) => { //Solo se utiliza el JWT
  try {
    const outValue = await deleteUser(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

const GetUser = async (req, res) => { //Solo se utiliza el JWT
  try {
    const outValue = await getUserData(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

router.post("/login", LoginUser);
router.post("/", PostUser);
router.get("/", tokenVerification, GetUser);
router.patch("/", tokenVerification, PatchUsers);
router.delete("/", tokenVerification, DeleteUser);

module.exports = router;
