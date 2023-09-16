const Contact = require('../models/contact');

module.exports = {
  index,
  new: newContact,
  getContacts,
  create,
  show
};

async function index(req, res, next) {
  res.render('contacts/index', { title: 'Welcome to Address Book!' });
}

async function newContact(req, res, next) {
  res.render('contacts/new', { title: 'Create New Contact' });
}

async function getContacts(req, res, next) {
  console.log(`In getContacts`, req.params);

  /* Find all users that begin with the letters given to us */
  let regexp = new RegExp("^[" + req.params.id + "]")
  console.log(regexp)
  if ( req.user ) {
    const contacts = await Contact.find({firstName: regexp});
    console.log(contacts)
    res.render('contacts/showTab', { title: 'Show Contacts (\'' + req.params.id + '\')', contacts });
  } else {
    res.render('contacts/index', { title: 'Welcome to Address Book!' });
  }
}

async function show(req, res) {
  const contact = await Contact.findById(req.params.id);

  res.render('contacts/show', { title: 'Show Contact', contact });
}

// function newMovie(req, res) {
//   // We'll want to be able to render an
//   // errorMsg if the create action fails
//   res.render('movies/new', { title: 'Add Movie', errorMsg: '' });
// }

async function create(req, res) {
  console.log(req.body)
  req.body.zipCode = parseInt(req.body.zipCode)  
  console.log(req.body)
  try {
    // Update this line because now we need the _id of the new movie
    const contact = await Contact.create(req.body);

    res.render(`/contacts/${contact._id}`, { title: 'Show Contact' });

  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('contacts/new', { errorMsg: err.message , title: 'Error' });
  }
}
