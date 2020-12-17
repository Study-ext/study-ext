import SimpleSchema from 'simpl-schema';

const ProfileFormSchema = new SimpleSchema({
  name: { type: String, label: 'Name' },
  email: { type: String, label: 'Email', optional: true },
  picture: { type: String, label: 'Picture URL' },
  bio: { type: String, label: 'Biographical statement', optional: true },
  currentClasses: { type: Array, label: 'Current Classes', optional: true },
  'currentClasses.$': { type: String, allowedValues: ['ICS 111', 'ICS 141', 'ICS 211', 'ICS 212', 'ICS 222', 'ICS 241', 'ICS 311', 'ICS 314'] },
  takenClasses: { type: Array, label: 'Taken Classes', optional: true },
  'takenClasses.$': { type: String, allowedValues: ['ICS 111', 'ICS 141', 'ICS 211', 'ICS 212', 'ICS 222', 'ICS 241', 'ICS 311', 'ICS 314'] },
});

export { ProfileFormSchema };
