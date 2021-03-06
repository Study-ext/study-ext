import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#585C67' };
    return (
        <Menu style={menuStyle} attached="top" borderless inverted>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>Study-ext</Header>
          </Menu.Item>
          {this.props.currentUser ? (
              [<Menu.Item id='nav-bar-calendar' as={NavLink} activeClassName="active" exact to="/calendar"
                          key='calendar'>Calendar</Menu.Item>,
                <Menu.Item id='nav-bar-leaderboard' as={NavLink} activeClassName="active" exact to="/leaderboard" key='leaderboard'>Leaderboard</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/createSession" key='createSession'>Create
                  Session</Menu.Item>,
                <Menu.Item as={NavLink} activeClassName="active" exact to="/listClasses" key='listClasses'>Classes</Menu.Item>,
              ]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/listUsersAdmin" key='listUsersAdmin'>View All Users (Admin)</Menu.Item>
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
             <Menu.Item as={NavLink} activeClassName="active" exact to="/listSessionsAdmin" key='listSessionsAdmin'>View All Session (Admin)</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact
                                   to="/signin"/>
                    <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact
                                   to="/signup"/>
                  </Dropdown.Menu>
                </Dropdown>
            ) : (
                <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
                  <Dropdown.Menu>
                    <Dropdown.Item id="navbar-profile" icon="user" text="Profile" as={NavLink} exact to="/userprofile"/>
                    <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact
                                   to="/signout"/>
                  </Dropdown.Menu>
                </Dropdown>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
