import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { Classes } from '../../api/classes/Classes';

/** Component for layout out a Class Card. */
const MakeCard = (props) => (
    <Card>
      <Card.Content>
        <Card.Header style={{ marginTop: '0px' }}>{props.class.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        {_.map(props.class.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
      </Card.Content>
    </Card>
);

MakeCard.propTypes = {
  class: PropTypes.object.isRequired,
};

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
          <Card.Group>
            {this.props.class.name}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListClasses.propTypes = {
  class: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(Classes.userPublicationName);
  const sub2 = Meteor.subscribe(Profiles.userPublicationName);
  const sub3 = Meteor.subscribe(ProfilesClasses.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(ListClasses);
