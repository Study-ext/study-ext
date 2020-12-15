import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import PublicProfile from '../components/PublicProfile';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';

function getData(email) {
  const data = Profiles.collection.findOne({ email });
  const rank = _.pluck(LeaderboardData.collection.find({ owner: email }).fetch(), 'rank');
  const currentClasses = _.pluck(ProfilesCurrentClasses.collection.find({ profile: email }).fetch(), 'currentClass');
  const takenClasses = _.pluck(ProfilesTakenClasses.collection.find({ profile: email }).fetch(), 'takenClass');
  return _.extend({ }, data, { rank, currentClasses, takenClasses });
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class PublicProfiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileData = emails.map(email => getData(email));

    return (
        <Container id='public-profile-page'>
          <Card.Group centered>
             {_.map(profileData, (profile, index) => <PublicProfile key={index} profile={profile} leaderboard={this.props.leaderboard}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Profiles documents in the props. */
PublicProfiles.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const sub1 = Meteor.subscribe('PublicProfiles');
  const sub2 = Meteor.subscribe(LeaderboardData.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);
  return {
    leaderboard: LeaderboardData.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(PublicProfiles);
