import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class ProfilesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfilesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      email: { type: String, optional: true },
      picture: String,
      rank: { type: String, optional: true },
      currentClasses: { type: Array, optional: true },
      'currentClasses.$': { type: String,
        allowedValues: [
          'ICS 111',
          'ICS 141',
          'ICS 211',
          'ICS 212',
          'ICS 222',
          'ICS 241',
          'ICS 311',
          'ICS 314',
        ],
      },
      takenClasses: { type: Array, optional: true },
      'takenClasses.$': { type: String,
        allowedValues: [
          'ICS 111',
          'ICS 141',
          'ICS 211',
          'ICS 212',
          'ICS 222',
          'ICS 241',
          'ICS 311',
          'ICS 314',
        ],
      },
      bio: { type: String, optional: true },
      owner: String,
    }, { tracker: Tracker });
    // Ensure collection documents obey schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Profiles = new ProfilesCollection();
