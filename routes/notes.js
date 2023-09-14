const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST /movies/:id/notes (create note for a contact)
// router.post('/movies/:id/notes', ensureLoggedIn, notesCtrl.create);
// DELETE /notes
// router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);

module.exports = router;
