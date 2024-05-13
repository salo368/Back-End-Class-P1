const express = require('express');

const router = express.Router();
const { tokenVerification } = require('../utils/authentication');
const {createNewBook, updateBookData, getBookById, getBooksUserList, deleteBook, getBooksListByFilter} = require('./book.controller');

const GetBook = async (req, res) => { 
  try {
    const outValue = await getBookById(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
};

const GetBooks = async (req, res) => { 
  try {
    const outValue = await getBooksListByFilter(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

const GetUserBooks = async (req, res) => { 
    try {
      const outValue = await getBooksUserList(req); 
      res.status(outValue.code).json(outValue.value);
    } catch (error) {
      res.status(500).json({ error: 'Error creating book' });
    }
};

const PatchBook = async (req, res) => { 
  try {
    const outValue = await updateBookData(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error updating book' });
  }
};

const DeleteBook = async (req, res) => { //Solo se utiliza el JWT
  try {

    const outValue = await deleteBook(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

const CreateBook = async (req, res) => { 
  try {
    const outValue = await createNewBook(req); 
    res.status(outValue.code).json(outValue.value);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

router.get("/", GetBook);
router.get("/filter", GetBooks);
router.get("/list",GetUserBooks);
router.post("/", tokenVerification, CreateBook);
router.patch("/", tokenVerification, PatchBook);
router.delete("/", tokenVerification, DeleteBook);

module.exports = router;
