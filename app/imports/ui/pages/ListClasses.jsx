import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profile/Profiles';
import { Classes } from '../../api/classes/Classes';
import { ProfilesClasses } from '../../api/profile/ProfilesClasses';
import Class from '../components/Class';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClasses extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id='list-classes-page'>
          <Header as='h2' textAlign="center" inverted>Classes</Header>
          <Card.Group>
            {this.props.classes.map((name, index) => <Class key={index}
                                                                  class={name}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListClasses.propTypes = {
  profiles: PropTypes.bool.isRequired,
  classes: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Classes.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesClasses.userPublicationName);
  return {
    classes: Classes.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(ListClasses);
