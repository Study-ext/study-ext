import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profile/Profiles';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';
import { CurrentClasses } from '../../api/classes/CurrentClasses';
import { TakenClasses } from '../../api/classes/TakenClasses';
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

Meteor.publish(Profiles.userPublicationName, function () {
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

Meteor.publish(CurrentClasses.userPublicationName, function () {
  if (this.userId) {
    return CurrentClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(TakenClasses.userPublicationName, function () {
  if (this.userId) {
    return TakenClasses.collection.find();
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

Meteor.publish('ProfilesCurrentUser', function publishProfilesCurrentUser() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return ProfilesCurrentClasses.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(ProfilesTakenClasses.userPublicationName, function () {
  if (this.userId) {
    return ProfilesTakenClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish('ProfilesTakenUser', function publishProfilesTakenUser() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Profiles.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Sessions.userPublicationName, function () {
  if (this.userId) {
    return Sessions.collection.find();
  }
  return this.ready();
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

Meteor.publish(CurrentClasses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return CurrentClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(TakenClasses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return TakenClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(ProfilesCurrentClasses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ProfilesCurrentClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(ProfilesTakenClasses.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ProfilesTakenClasses.collection.find();
  }
  return this.ready();
});

Meteor.publish(LeaderboardData.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return LeaderboardData.collection.find();
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
