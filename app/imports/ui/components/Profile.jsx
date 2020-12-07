import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
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
              Rank:
              <br/>
              Bio: {this.props.profile.bio}
            </Card.Description>
          </Card.Content>
            <Card.Content>
              Current Classes:
              {this.props.profile.currentClasses}
              <br/>
              Taken Classes:
              {this.props.profile.takenClasses}
          </Card.Content>
          <Card.Content extra>
            <Link to={`/editprofile/${this.props.profile._id}`}>Edit Profile</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(Profile);
