import React from 'react';
import { Table, Image, Header, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import Profile from '../components/Profile';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Leaderboard extends React.Component {
  render() {

    return (
        <Table.Row>
          <Table.Cell>
            <Header as='h4' image as={NavLink} exact to="/viewprofile/_id">
                <Image
                    size='tiny'
                    rounded
                    floated='left'
                    src={this.props.leaderboard.picture}/>
                <Header.Content>
                  {this.props.leaderboard.name}
                </Header.Content>
            </Header>
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
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Leaderboard);
