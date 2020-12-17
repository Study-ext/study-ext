import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListProfileAdmin from '../components/ListProfileAdmin';
import { Profiles } from '../../api/profile/Profiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListUsersAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header inverted as="h2" textAlign="center">List All Users (Admin)</Header>
          <Table color="white">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>Current Classes</Table.HeaderCell>
                <Table.HeaderCell>Taken Classes</Table.HeaderCell>
                <Table.HeaderCell>Bio</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.profiles.map((profile) => <ListProfileAdmin key={profile._id} profile={profile} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListUsersAdmin.propTypes = {
  profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.adminPublicationName);
  const subscription2 = Meteor.subscribe('allUsers');
  return {
    profiles: Profiles.collection.find({}, { sort: { name: +1 } }).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(ListUsersAdmin);
