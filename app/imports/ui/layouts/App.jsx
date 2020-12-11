import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import ListUsersAdmin from '../pages/ListUsersAdmin';
import ListSessionsAdmin from '../pages/ListSessionsAdmin';
import CreateProfile from '../pages/CreateProfile';
import QuickGuide from '../pages/QuickGuide';
import UserProfile from '../pages/UserProfile';
import EditProfile from '../pages/EditProfile';
import CalendarPage from '../pages/CalendarPage';
import CreateSession from '../pages/CreateSession';
import ViewLeaderboard from '../pages/ViewLeaderboard';
import ListClasses from '../pages/ListClasses';
import EditStuff from '../pages/EditStuff';
// eslint-disable-next-line no-unused-vars
import LeaderboardPage from '../pages/LeaderboardPage';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <ProtectedRoute path="/createprofile" component={CreateProfile}/>
              <ProtectedRoute path="/quickguide" component={QuickGuide}/>
              <ProtectedRoute path="/userprofile" component={UserProfile}/>
              <ProtectedRoute path="/editprofile/:_id" component={EditProfile}/>
              <ProtectedRoute path="/calendar" component={CalendarPage}/>
              <ProtectedRoute path="/leaderboard" component={ViewLeaderboard}/>
              <ProtectedRoute path="/createSession" component={CreateSession}/>
              <ProtectedRoute path="/listClasses" component={ListClasses}/>
              <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin}/>
              <AdminProtectedRoute path="/listUsersAdmin" component={ListUsersAdmin}/>
              <AdminProtectedRoute path="/listSessionsAdmin" component={ListSessionsAdmin}/>
              <ProtectedRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
            <Footer/>
          </div>
        </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
          const isLogged = Meteor.userId() !== null;
          const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
          return (isLogged && isAdmin) ?
              (<Component {...props} />) :
              (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
              );
        }}
    />
);

/** Require a component and location to be passed to each ProtectedRoute. */
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

/** Require a component and location to be passed to each AdminProtectedRoute. */
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
