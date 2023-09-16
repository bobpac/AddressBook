const Contact = require('../models/contact');

module.exports = {
   addNote,
   delNote
};

async function addNote(req, res, next) {
  req.body.user = req.user._id;
  const contact = await Contact.findById(req.params.id);
  contact.notes.push(req.body);
  try {
    await contact.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/contacts/${contact._id}`);
}

async function delNote(req, res, next) {
  req.body.user = req.user._id;
  const contact = await Contact.findOne( {'notes._id': req.params.id, 'notes.user': req.user._id} );
  contact.notes.remove(req.params.id);

  try {
    await contact.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/contacts/${contact._id}`);

}