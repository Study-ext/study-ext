import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';

function getData(email) {
  const data = Profiles.collection.findOne({ email });
  const rank = _.pluck(LeaderboardData.collection.find({ owner: email }).fetch(), 'rank');
  return _.extend({ }, data, { rank });
}

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const currentUser = _.pluck(Profiles.collection.find().fetch(), 'name');
    const emails = _.pluck(Profiles.collection.find().fetch(), 'email');
    const profileData = emails.map(email => getData(email));
    return (
        <Container id='view-profile-page'>
          <Header style={{ fontSize: '4vh', color: 'white', fontFamily: 'Courier' }}inverted>Hello, {currentUser}</Header>
          <Card.Group centered>
            {_.map(profileData, (profile, index) => <Profile key={index} profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Profiles documents in the props. */
UserProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  const subscription2 = Meteor.subscribe(LeaderboardData.userPublicationName);
  return {
    profiles: Profiles.collection.find({}).fetch(),
    leaderboard: LeaderboardData.collection.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(UserProfile);
