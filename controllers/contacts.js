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
  const states = [ "--", 
                   "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
                   "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
                   "MD", "MA", "MI", "MN", "MO", "MT", "NE", "NV", "NH", "NJ", 
                   "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
                   "SC", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ];
  res.render('contacts/new', { title: 'Create New Contact' ,states});
}

async function getContacts(req, res, next) {
  /* Find all users that begin with the letters given to us */
  let regexp = new RegExp("^[" + req.params.id + "]","i")
  if ( req.user ) {
    const contacts = await Contact.find({firstName: regexp}).sort({firstName: 1});
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

    res.redirect(`/contacts/${contact._id}`);

  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('/contacts/new', { errorMsg: err.message , title: 'Error' });
  }
}

