import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profiles';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';
import { Classes } from '../../api/classes/Classes';
import { Sessions } from '../../api/session/Session';

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

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile(data) {
  console.log(`Defining profile ${data.owner}`);
  Profiles.collection.insert(data);
}

function addLeaderboard(data) {
  console.log(`Adding leaderboard: ${data.name} (${data.owner})`);
  LeaderboardData.collection.insert(data);
}

function addClass(data) {
  console.log(`Adding class: ${data.name} (${data.owner})`);
  Classes.collection.insert(data);
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
}

if (LeaderboardData.collection.find().count() === 0) {
  if (Meteor.settings.defaultLeaderboard) {
    console.log('Creating default leaderboard.');
    Meteor.settings.defaultLeaderboard.map(data => addLeaderboard(data));
  }
}

if (Classes.collection.find().count() === 0) {
  if (Meteor.settings.defaultClasses) {
    console.log('Creating default classes.');
    Meteor.settings.defaultClasses.map(data => addClass(data));
  }
}

if (Sessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default sessions.');
    Meteor.settings.defaultSession.map(data => addSession(data));
  }
}

/** Initialize the DB if empty (no users defined.) */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles');
    Meteor.settings.defaultProfiles.map(profile => addProfile(profile));
  } else {
    console.log('Cannot initialize the database. Please invoke meteor with a settings file.');
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Meteor.users.find().count() < 7)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}
