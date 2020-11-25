import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Contacts } from '../../api/contact/Contacts';
import { ProfileData } from '../../api/profile/ProfileData';

/* eslint-disable no-console */

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

// /* for ProfileData collection */
// function addProfile(data) {
//   console.log(`  Adding: ${data.lastName} (${data.owner})`);
//   ProfileData.collection.insert(data);
// }
//
// /** Initialize the collection if empty. */
// if (ProfileData.collection.find().count() === 0) {
//   if (Meteor.settings.defaultProfiles) {
//     console.log('Creating default profiles.');
//     Meteor.settings.defaultProfiles.map(data => addProfile(data));
//   }
// }
