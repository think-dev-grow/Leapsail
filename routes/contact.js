const express = require('express');
const {
  addContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contact');
const router = express.Router();

router.post('/', addContact);

router.get('/', getContacts);

router.get('/find/:id', getContact);

router.put('/:id', updateContact);

router.delete('/:id', deleteContact);

module.exports = router;
