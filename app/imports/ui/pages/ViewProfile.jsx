import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewProfile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Profile</Header>
          <Card.Group centered>
            {this.props.profiles.map((profile, index) => <Profile key={index}
                                                                  profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Profiles documents in the props. */
ViewProfile.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Profiles documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    profiles: Profiles.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ViewProfile);
