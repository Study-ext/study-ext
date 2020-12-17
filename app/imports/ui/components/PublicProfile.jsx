import React from 'react';
import { Card, Image, Label, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { _ } from 'meteor/underscore';

class PublicProfile extends React.Component {
  render() {
    return (
        <Card centered fluid>
          <Card.Content>
            <Card.Header>{this.props.profile.name}</Card.Header>
            <Image
                floated='left'
                size='small'
                src={this.props.profile.picture}
            />
            <Card.Description>
              <Header as='h5'>Rank:</Header>
              {this.props.profile.rank}
              <Header as='h5'>Bio:</Header>
              {this.props.profile.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Header as='h5'>Current Classes:</Header>
            {_.map(this.props.profile.currentClasses, (currentClass, index) => <Label key={index} size='tiny' color='teal'>{currentClass}</Label>)}
            <Header as='h5'>Taken Classes:</Header>
            {_.map(this.props.profile.takenClasses, (takenClass, index) => <Label key={index} size='tiny' color='teal'>{takenClass}</Label>)}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
PublicProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(PublicProfile);
