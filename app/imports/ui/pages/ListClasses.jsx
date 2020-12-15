import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Header, Image, Grid } from 'semantic-ui-react';
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
  return _.extend({}, { name, currentClassProfiles: currentProfilePictures });
}

/** Component for layout out a Class Card. */
const MakeCurrentCard = (props) => (
    <Card centered>
      <Card.Content>
        <Card.Header style={{ marginTop: '0px', fontsize: '1vw', textAlign: 'center' }}>
          Current: {props.currentClass.name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        {_.map(props.currentClass.currentClassProfiles, (p, index) => <Image key={index} circular size='mini'
                                                                             src={p}/>)}
      </Card.Content>
    </Card>
);

MakeCurrentCard.propTypes = {
  currentClass: PropTypes.object.isRequired,
};

function getTakenClassData(name) {
  const takenClassProfiles = _.pluck(ProfilesTakenClasses.collection.find({ takenClass: name }).fetch(), 'profile');
  const takenProfilePictures = takenClassProfiles.map(profile => Profiles.collection.findOne({ email: profile }).picture);
  return _.extend({}, { name, takenClassProfiles: takenProfilePictures });
}

const MakeTakenCard = (props) => (
    <Card centered>
      <Card.Content>
        <Card.Header style={{ marginTop: '0px', fontsize: '1vw', textAlign: 'center' }}>
          Taken: {props.takenClass.name}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        {_.map(props.takenClass.takenClassProfiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      </Card.Content>
    </Card>
);

MakeTakenCard.propTypes = {
  takenClass: PropTypes.object.isRequired,
};

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClasses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const currentClasses = _.uniq(_.pluck(CurrentClasses.collection.find({}, { sort: { name: 1 } }).fetch(), 'name'));
    const takenClasses = _.uniq(_.pluck(TakenClasses.collection.find({}, { sort: { name: 1 } }).fetch(), 'name'));
    const currentClassData = currentClasses.map(currentClass => getCurrentClassData(currentClass));
    const takenClassData = takenClasses.map(takenClass => getTakenClassData(takenClass));
    return (
        <Container id='list-classes-page'>
          <Grid columns='equal'>
            <Grid.Column>
              <Header as='h2' inverted textAlign='center'>
                Mentees
              </Header>
              <Card.Group>
                {_.map(currentClassData, (currentClass, index) => <MakeCurrentCard key={index}
                                                                                   currentClass={currentClass}/>)}
              </Card.Group>
            </Grid.Column>
            <Grid.Column>
              <Header as='h2' inverted textAlign='center'>
                Mentors
              </Header>
              <Card.Group>
                {_.map(takenClassData, (takenClass, index) => <MakeTakenCard key={index} takenClass={takenClass}/>)}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
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
