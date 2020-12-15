import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Header, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { CurrentClasses } from '../../api/classes/CurrentClasses';
import { TakenClasses } from '../../api/classes/TakenClasses';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';

function getCurrentClassData(name) {
  const currentClassProfiles = _.pluck(ProfilesCurrentClasses.collection.find({ currentClass: name }).fetch(), 'profile');
  const currentProfilePictures = currentClassProfiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  // const currentProfileNames = currentClassProfiles.map(profile => Profiles.collection.findOne({ email: profile }).name);
  return _.extend({ }, { name, currentClassProfiles: currentProfilePictures });
}

// function getTakenClassData(name) {
//   const takenClassProfiles = _.pluck(ProfilesTakenClasses.collection.find({ takenClass: name }).fetch(), 'profile');
//   const takenProfilePictures = takenClassProfiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
//   return _.extend({ }, { name, takenClassProfiles: takenProfilePictures });
// }

/** Component for layout out a Class Card. */
const MakeCard = (props) => (
    <Card centered fluid>
      <Card.Content>
        <Card.Header style={{ fontsize: '2vh', marginTop: '0px' }}>
          Current: {props.currentClass.name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        {_.map(props.currentClass.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      </Card.Content>
      {/* <Card.Content> */}
      {/*  <Card.Header style={{ marginTop: '0px' }}> */}
      {/*    Taken: {props.takenClass.name} */}
      {/*  </Card.Header> */}
      {/* </Card.Content> */}
      {/* <Card.Content extra> */}
      {/*  {_.map(props.takenClass.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)} */}
      {/* </Card.Content> */}
    </Card>
);

MakeCard.propTypes = {
  currentClass: PropTypes.object.isRequired,
  // takenClass: PropTypes.object.isRequired,
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClasses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const currentClasses = _.uniq(_.pluck(CurrentClasses.collection.find().fetch(), 'name'));
    // const takenClasses = _.pluck(TakenClasses.collection.find().fetch(), 'name');
    const currentClassData = currentClasses.map(currentClass => getCurrentClassData(currentClass));
    // const takenClassData = takenClasses.map(takenClass => getTakenClassData(takenClass));
    return (
        <Container id='list-classes-page'>
          <Header as='h2' textAlign="center" inverted>Classes</Header>
          <Card.Group>
            {_.map(currentClassData, (currentClass, index) => <MakeCard key={index} currentClass={currentClass}/>)}
             {/* {_.map(takenClassData, (takenClass, index) => <MakeCard key={index} currentClass={takenClass}/>)} */}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of documents in the props. */
ListClasses.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to documents.
  const sub1 = Meteor.subscribe(CurrentClasses.userPublicationName);
  const sub2 = Meteor.subscribe(TakenClasses.userPublicationName);
  const sub3 = Meteor.subscribe('PublicProfiles');
  const sub4 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub5 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(ListClasses);
