const Contact = require('../models/contact');

module.exports = {
  index,
  new: newContact,
  getContacts,
  create,
  show,
  delete: deleteContact,
  edit,
  update
};

const states = [ "--", 
"AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
"GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
"MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NH", "NJ", 
"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
"SC", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ];

const tabs = [ "AB",  "CD",  "EF",  "GH", 
               "IJ",  "KL",  "MN",  "OP", 
               "QRS", "TU",  "VW",  "XYZ"];

async function index(req, res, next) {
  res.render('contacts/index', { title: 'Welcome to Address Book!' });
}

async function newContact(req, res, next) {
  res.render('contacts/new', { title: 'Add Contact' ,states});
}

async function edit(req, res, next) {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/edit', { title: 'Edit Contact' , contact});
}

async function getContacts(req, res, next) {
  /* Find all users that begin with the letters given to us */
  let regexp = new RegExp("^[" + req.params.id + "]","i")
  if ( req.user ) {
    const contacts = await Contact.find({'firstName': regexp, 'user': req.user._id}).sort({firstName: 1});
    res.render('contacts/showTab', { title: 'Show Contacts (\'' + req.params.id + '\')', contacts });
  } else {
    res.render('contacts/index', { title: 'Welcome to Address Book!' });
  }
}

async function show(req, res) {
  const contact = await Contact.findById(req.params.id);
  res.render('contacts/show', { title: 'Show Contact', contact });
}

async function create(req, res) {
  req.body.user    = req.user._id;
  req.body.zipCode = parseInt(req.body.zipCode)  
  try {
    // Update this line because now we need the _id of the new movie
    const contact = await Contact.create(req.body);
    res.redirect(`/contacts/${contact._id}`);
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
  }
}

async function deleteContact(req, res) {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    firstLetter = contact.firstName.charAt(0).toUpperCase();
    let foundTab = -1;
    tabs.forEach((element) => {
      const result = element.includes(firstLetter);
      if ( result ) {
        foundTab = element;
      }
    })
    if ( foundTab === -1 ) {
      res.render('contacts/index', { title: 'Welcome to Address Book!' });
    } else {
      let regexp = new RegExp("^[" + foundTab + "]","i")
      const contacts = await Contact.find({firstName: regexp}).sort({firstName: 1});
      res.render('contacts/showTab', { title: 'Show Contacts (\'' + foundTab + '\')', contacts });
    }
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
  }
}

async function update(req, res) {

  req.body.zipCode = parseInt(req.body.zipCode)  

  const contact = await Contact.findById(req.params.id);
  contact.firstName = req.body.firstName;
  contact.lastName  = req.body.lastName;
  contact.address1  = req.body.address1;
  contact.address2  = req.body.address2;
  contact.city      = req.body.city;
  contact.state     = req.body.state;
  contact.zipCode   = req.body.zipCode;
  contact.email     = req.body.email;
  contact.phone     = req.body.phone;

  try {
    await contact.save();
    res.redirect(`/contacts/${contact._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/contacts/${contact._id}/edit`);
  }
}