import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';
import { Classes } from '../../api/classes/Classes';
import Profile from '../components/Profile';
import Class from '../components/Class';

function getClassData(name) {
  const currentProfiles = _.pluck(ProfilesCurrentClasses.collection.find({ class: name }).fetch(), 'profile');
  const takenProfiles = _.pluck(ProfilesTakenClasses.collection.find({ class: name }).fetch(), 'profile');
  const currentProfilePictures = currentProfiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  const takenProfilePictures = takenProfiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({ }, { name, currentProfiles: currentProfilePictures, takenProfiles: takenProfilePictures });
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClasses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const classes = _.pluck(Classes.collection.find().fetch(), 'name');
    const classData = classes.map(course => getClassData(course));
    return (
        <Container id='list-classes-page'>
          <Header inverted style={{ fontSize: '4vh', fontFamily: 'Courier' }}>CLASSES</Header>
          <Card.Group>
            {_.map(classData, (course, index) => <Class key={index} course={course}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListClasses.propTypes = {
  profiles: PropTypes.bool.isRequired,
  classes: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Classes.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);
  const sub5 = Meteor.subscribe('allUsers');
  return {
    classes: Classes.collection.find({}).fetch(),
    profiles: Profiles.collection.find({}).fetch(),
    currentClasses: ProfilesCurrentClasses.collection.find({}).fetch(),
    takenClasses: ProfilesTakenClasses.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(ListClasses);
