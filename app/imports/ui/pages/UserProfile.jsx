import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserProfile extends React.Component {

  getData(email) {
    const data = this.props.profile;
    const rank = _.pluck(LeaderboardData.collection.find({ owner: email }).fetch(), 'rank');
    const currentClasses = _.pluck(ProfilesCurrentClasses.collection.find({ profile: email }).fetch(), 'currentClass');
    const takenClasses = _.pluck(ProfilesTakenClasses.collection.find({ profile: email }).fetch(), 'takenClass');
    return _.extend({ }, data, { rank, currentClasses, takenClasses });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const currentUser = this.props.profile.name;
    const email = this.props.profile.email;
    const profileData = this.getData(email);
    return (
        <Container id='user-profile-page'>
          <Header style={{ fontSize: '4vh', color: 'white', fontFamily: 'Courier' }} inverted>Hello, {currentUser}</Header>
          <Profile profile={profileData} leaderboard={this.props.leaderboard}/>
        </Container>
    );
  }
}

/** Require an array of Profiles documents in the props. */
UserProfile.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const sub1 = Meteor.subscribe(Profiles.userPublicationName);
  const sub2 = Meteor.subscribe(LeaderboardData.userPublicationName);
  // const sub3 = Meteor.subscribe('ProfilesCurrentUser');
  // const sub4 = Meteor.subscribe('ProfilesTakenUser');
  const sub3 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);

  return {
    profile: Profiles.collection.find({}).fetch()[0],
    leaderboard: LeaderboardData.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready(),
  };
})(UserProfile);
