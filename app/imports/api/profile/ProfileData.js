import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const ProfileData = new Mongo.Collection('ProfileData');

const ProfileDataValues = {
  hobbies: ['Surfing', 'Running', 'Biking', 'Paddling'],
  levels: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
  majors: ['Physics', 'Math', 'Chemistry', 'Computer Science'],
};

/** Define a schema to specify the structure of each document in the collection. */
const ProfileDataSchema = new SimpleSchema({
  name: String,
  email: String,
  image: String,
  bio: { type: String, optional: true, defaultValue: '' },
  hobbies: { type: Array, optional: true },
  'hobbies.$': { type: String, allowedValues: ProfileDataValues.hobbies },
  level: { type: String, allowedValues: ProfileDataValues.levels },
  gpa: Number,
  major: String,
}, { tracker: Tracker });

/** Attach the schema to the collection. */
ProfileData.attachSchema(ProfileDataSchema);

/** Make these objects available to others. */
export { ProfileDataValues, ProfileData, ProfileDataSchema };
