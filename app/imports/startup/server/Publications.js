import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profile/Profiles';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';
import { Classes } from '../../api/classes/Classes';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';
import { Sessions } from '../../api/session/Session';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Meteor.publish(Profiles.userPublicationName, function () {
//   if (this.userId) {
//     const username = Meteor.users.findOne(this.userId).username;
//     return Profiles.collection.find({ owner: username });
//   }
//   return this.ready();
// });

Meteor.publish('UserProfiles', function publishUserProfiles() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish('PublicProfiles', function publishPublicProfiles() {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Classes.userPublicationName, function () {
  if (this.userId) {
    return Classes.collection.find();
  }
  return this.ready();
});

Meteor.publish(LeaderboardData.userPublicationName, function () {
  if (this.userId) {
    return LeaderboardData.collection.find();
  }
  return this.ready();
});

Meteor.publish(ProfilesCurrentClasses.userPublicationName, function () {
  if (this.userId) {
    return ProfilesCurrentClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(ProfilesTakenClasses.userPublicationName, function () {
  if (this.userId) {
    return ProfilesTakenClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(Sessions.userPublicationName, function () {
  if (this.userId) {
    return Sessions.collection.find();
  }
  return this.ready();
});

Meteor.publish('allUsers', function allUsers() {
  return Meteor.users.find({}, {
    fields: {
      username: 1,
      profile: 1,
    },
  });
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(LeaderboardData.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return LeaderboardData.collection.find();
  }
  return this.ready();
});

Meteor.publish(Classes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Classes.collection.find();
  }
  return this.ready();
});

Meteor.publish(Sessions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Sessions.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
