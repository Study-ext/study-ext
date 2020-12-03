import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProfileData = new Mongo.Collection('ProfileData');

const ProfileDataValues = {
  takenCourses: ['ICS111', 'ICS141', 'ICS211', 'ICS212', 'ICS241', 'ICS311'],
  currentCourses: ['ICS111', 'ICS141', 'ICS211', 'ICS212', 'ICS241', 'ICS311'],
  levels: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
  majors: ['Physics', 'Math', 'Chemistry', 'Computer Science'],
};

/** Define a schema to specify the structure of each document in the collection. */
const ProfileDataSchema = new SimpleSchema({
  name: String,
  // email: String,
  image: String,
  takenCourses: { type: Array, optional: false },
  'takenCourses.$': { type: String, allowedValues: ProfileDataValues.takenCourses },
  currentCourses: { type: Array, optional: false },
  'currentCourses.$': { type: String, allowedValues: ProfileDataValues.currentCourses },
  bio: { type: String, optional: true, defaultValue: '' },
  level: { type: String, allowedValues: ProfileDataValues.levels },
  gpa: Number,
  major: String,
}, { tracker: Tracker });

/** Attach the schema to the collection. */
ProfileData.attachSchema(ProfileDataSchema);

/** Make these objects available to others. */
export { ProfileDataValues, ProfileData, ProfileDataSchema };
