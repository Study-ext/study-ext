import { Meteor } from 'meteor/meteor';
// import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profiles';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';
import { CurrentClasses } from '../../api/classes/CurrentClasses';
import { TakenClasses } from '../../api/classes/TakenClasses';
import { Sessions } from '../../api/session/Session';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';

/* eslint-disable no-console */

/** Define a user in the Meteor accounts package. This enables login. Username is the email address. */
// function createUser(email, role) {
//   const userID = Accounts.createUser({ username: email, email, password: '' });
//   if (role === 'admin') {
//     Roles.createRole(role, { unlessExists: true });
//     Roles.addUsersToRoles(userID, 'admin');
//   }
// }

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

/** Defines a new user and associated profile. Error if user already exists. */
function addCurrentClass(currentClass) {
  CurrentClasses.collection.update({ name: currentClass }, { $set: { name: currentClass } }, { upsert: true });
}

function addTakenClass(takenClass) {
  TakenClasses.collection.update({ name: takenClass }, { $set: { name: takenClass } }, { upsert: true });
}

function addProfile({ name, email, picture, rank, currentClasses, takenClasses, bio, owner }) {
  console.log(`Defining profile ${email}`);
  // createUser(email, role);
  Profiles.collection.insert({ name, email, picture, rank, bio, owner });
  // Add classes
  currentClasses.map(currentClass => ProfilesCurrentClasses.collection.insert({ profile: email, currentClass }));
  takenClasses.map(takenClass => ProfilesTakenClasses.collection.insert({ profile: email, takenClass }));
  currentClasses.map(currentClass => addCurrentClass(currentClass));
  takenClasses.map(takenClass => addTakenClass(takenClass));
}

function addLeaderboard(data) {
  console.log(`Adding leaderboard: ${data.name} (${data.owner})`);
  LeaderboardData.collection.insert(data);
}

function addSession(data) {
  console.log(`Adding session: ${data.name}`);
  Sessions.collection.insert(data);
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }

  if ((Meteor.settings.loadAssetsFile)) {
    const assetsFileName = 'data.json';
    console.log(`Loading data from private/${assetsFileName}`);
    const jsonData = JSON.parse(Assets.getText(assetsFileName));
    jsonData.profiles.map(profile => addProfile(profile));
  }
}

// /** Initialize the DB if empty (no users defined.) */
// if (Meteor.users.find().count() === 0) {
//   if (Meteor.settings.defaultProfiles) {
//     console.log('Creating default profiles');
//     Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
//   } else {
//     console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
//   }
// }

if (LeaderboardData.collection.find().count() === 0) {
  if (Meteor.settings.defaultLeaderboard) {
    console.log('Creating default leaderboard.');
    Meteor.settings.defaultLeaderboard.map(data => addLeaderboard(data));
  }
}

if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSession.map(data => addSession(data));
  }
}

Meteor.users.allow({
  remove: function (userId, doc) {
    console.log('Test');
    if (Roles.userIsInRole(userId, 'admin') && userId !== doc._id) {
      console.log('Access granted. You are an administrator and you are not trying to delete your own document.');
      return true;
    }
      console.log('Access denied. You are not an administrator or you are trying to delete your own document.');
      return false;
  },
  fetch: [],
});
