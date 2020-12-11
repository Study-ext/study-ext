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
  const profiles = Profiles.collection.findOne({ email });
  const profilePictures = profiles.map(profile => Profiles.collection.findOne({ name: profile }).picture);
  const currentClasses = _.pluck(Profiles.collection.find({ currentClass: name }).fetch(), 'currentClasses');
  const takenClasses = _.pluck(Profiles.collection.find({ takenClass: name }).fetch(), 'takenClasses');
  return _.extend({ }, { name, currentClasses, takenClasses, profiles: profilePictures });
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
    return (
        <Container id='list-classes-page'>
          <Header inverted style={{ fontSize: '4vh', fontFamily: 'Courier' }}>Classes</Header>
          <Card.Group>
            {this.props.classes.map((course, index) => <Class key={index} course={course}/>)}
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
