const express = require('express');
const router = express.Router();

const contactsCtrl = require('../controllers/contacts');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /contacts
router.post('/', contactsCtrl.index );



// GET /contacts/new
// router.get('/new', ensureLoggedIn, contactsCtrl.new);

// GET /contacts/:id (show functionality) MUST be below new route
// router.get('/:id', contactsCtrl.show);

// POST /contacts
// router.post('/', ensureLoggedIn, contactsCtrl.create);

module.exports = router;
