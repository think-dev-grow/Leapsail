const Contact = require('../models/Contact.js');
const handleError = require('../utils/error');

const addContact = async (req, res, next) => {
  const contactInfo = new Contact(req.body);
  try {
    const userContact = await contactInfo.save();
    res.status(200).json(userContact);
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id });

    if (!contact) return next(handleError(404, 'Contact not found'));
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json('Updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json('deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteContact,
  updateContact,
  getContacts,
  getContact,
  addContact,
};
