import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Contacts } from '../../api/contact/Contacts';
import { Profiles } from '../../api/profile/Profiles';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
function createUser(email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/* for Contacts collection */
function addContact(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  Contacts.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contacts.');
    Meteor.settings.defaultContacts.map(data => addContact(data));
  }
}

/* for Profiles collection */
// function addProfile(data) {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Profiles.insert(data);
// }
/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ name, email, picture, currentClasses, takenClasses, bio, role }) {
  console.log(`Defining profile ${email}`);
  // Define the user in the Meteor accounts package.
  createUser(email, role);
  // Create the profile.
  Profiles.insert({ name, email, picture, currentClasses, takenClasses, bio });
}

/** Initialize the DB if empty (no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultUsers) {
    console.log('Creating default profiles');
    Meteor.settings.defaultUsers.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
  }
}
