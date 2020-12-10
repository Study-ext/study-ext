import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Table } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Leaderboard from '../components/Leaderboard';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ViewLeaderboard extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <Container>
          <Header inverted as="h2" textAlign="center">Leaderboard</Header>
          <Table basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Rank</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.leaderboarddata.map((leaderboard) => <Leaderboard key={leaderboard._id}
                                                                            leaderboard={leaderboard}/>)}

            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ViewLeaderboard.propTypes = {
  leaderboarddata: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Leaderboard documents.
  const subscription = Meteor.subscribe(LeaderboardData.userPublicationName);
  const subscription2 = Meteor.subscribe('allUsers');
  return {
    leaderboarddata: LeaderboardData.collection.find({}, { sort: { points: -1 } }).fetch(),

    ready: subscription.ready() && subscription2.ready(),
  };
})(ViewLeaderboard);
