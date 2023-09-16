const express = require('express');
const router = express.Router();

const contactsCtrl = require('../controllers/contacts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /contacts
router.get('/', contactsCtrl.index)

// POST /contacts/:id
router.post('/:id', contactsCtrl.getContacts);

// POST /contacts
router.post('/', contactsCtrl.create);

// GET /contacts/new
router.get('/new', contactsCtrl.new);

// GET /contacts/:id (show functionality) MUST be below new route
router.get('/:id', contactsCtrl.show);

module.exports = router;
