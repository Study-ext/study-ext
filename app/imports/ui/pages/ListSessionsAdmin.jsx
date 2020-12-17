import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ListSessionAdmin from '../components/ListSessionAdmin';
import { Sessions } from '../../api/session/Session';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListSessionsAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header inverted as="h2" textAlign="center">List All Sessions (Admin)</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Subject</Table.HeaderCell>
                <Table.HeaderCell>Info</Table.HeaderCell>
                <Table.HeaderCell>Time</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.sessions.map((session) => <ListSessionAdmin key={session._id} session={session} Sessions={Sessions} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}
/** Require an array of Stuff documents in the props. */
ListSessionsAdmin.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Sessions.adminPublicationName);
  const subscription1 = Meteor.subscribe('allUsers');
  return {
    sessions: Sessions.collection.find({}, { sort: { subject: +1, day: +1 } }).fetch(),
    ready: subscription.ready() && subscription1.ready(),
  };
})(ListSessionsAdmin);
