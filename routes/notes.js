const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /contacts/:id/note (create note for a contact)
router.post('/contacts/:id/notes', ensureLoggedIn, notesCtrl.addNote);

// DELETE /notes/:id (delete note for a contact)
router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delNote);

module.exports = router;
