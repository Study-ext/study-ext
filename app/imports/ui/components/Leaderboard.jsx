import React from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';
import { LeaderboardData } from '../../api/leaderboardData/LeaderboardData';

// function sortLeaderboard() {
// const usersPoints = _.pluck(LeaderboardData.collection.find({}, { sort: { points: -1 } }).fetch(), 'points');
//   console.log(usersPoints);
//   _.sortBy(usersPoints, function (num) { return -num; });
// }
//
// console.log(sortLeaderboard());

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Leaderboard extends React.Component {
  render() {

    return (
        <Table.Row>
          <Table.Cell>
            <Image
                size='mini'
                floated='left'
                src={this.props.leaderboard.picture}/>
            {this.props.leaderboard.name}
          </Table.Cell>
          <Table.Cell>{this.props.leaderboard.rank}</Table.Cell>
          <Table.Cell>
            {this.props.leaderboard.points}
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
Leaderboard.propTypes = {
  leaderboard: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Leaderboard);
