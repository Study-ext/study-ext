import React from 'react';
import { Table, Image, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { _ } from 'meteor/underscore';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Leaderboard extends React.Component {
  render() {
    const userID = this.props.leaderboard.owner;
    // console.log(userID);
    const path = `/publicprofile/${userID}`;
    return (
        <Table.Row>
          <Table.Cell>
            <Header as={NavLink} activeClassName="active" exact to={path} image>
              <Image
                  size='small'
                  rounded
                  floated='left'
                  src={this.props.leaderboard.picture}/>
              <Header.Content>
                {this.props.leaderboard.name}
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {this.props.leaderboard.rank}
          </Table.Cell>
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
