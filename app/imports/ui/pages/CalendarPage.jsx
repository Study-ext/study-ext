import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Sessions } from '../../api/session/Session'
import Calendar from '../components/Calendar';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CalendarPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='calendar-page'>
          <Header style={{ fontSize: '4vh', color: 'white', fontFamily: 'Courier' }}>CALENDAR</Header>
          <Container style={{ marginBottom: '1vh', backgroundColor: 'white' }}>
            <Calendar style={{ backgroundColor: 'white', height: '50vh' }}/>
          </Container>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CalendarPage.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    sessions: Sessions.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CalendarPage);
