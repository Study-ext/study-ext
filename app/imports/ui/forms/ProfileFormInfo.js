import SimpleSchema from 'simpl-schema';
import { ProfileDataValues as DataValues } from '../../api/profile/ProfileData';

const gpaValues = ['0.0-0.9', '1.0-1.9', '2.0-2.9', '3.0-3.9', '4.0+'];

const gpa2String = (num) => gpaValues[num];
const gpa2Number = (string) => gpaValues.indexOf(string);

const ProfileFormSchema = new SimpleSchema({
  name: { label: 'Name', type: String },
  email: { label: 'Email', type: String },
  image: { label: 'Image', type: String },
  takenCourses: { label: 'Courses taken', type: Array, optional: false },
  'takenCourses.$': { type: String, allowedValues: DataValues.takenCourses },
  currentCourses: { label: 'Courses currently taking', type: Array, optional: false },
  'currentCourses.$': { type: String, allowedValues: DataValues.currentCourses },
  bio: { label: 'Biographical Statement', type: String, optional: true, defaultValue: '' },
  level: { label: 'Level', type: String, allowedValues: DataValues.levels, defaultValue: DataValues.levels[0] },
  gpa: { label: 'GPA', type: String, allowedValues: gpaValues },
  major: { label: 'Major', type: String, allowedValues: DataValues.majors },
  enrolled: { label: 'Date Enrolled', type: Date, defaultValue: new Date() },
});

export { ProfileFormSchema, gpa2String, gpa2Number };
