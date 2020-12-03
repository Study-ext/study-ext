import React from 'react';
import { Item, Image, Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Item>
          <Item.Image size='small' src='this.props.profile.picture' />
          <Item.Content>
            <Card.Header>{this.props.profile.name}</Card.Header>
            <Card.Description>
              {this.props.profile.bio}
            </Card.Description>
          </Item.Content>
          <Card.Content extra>
            <Link to={`/editprofile/${this.state.email}`}>Edit Profile</Link>
          </Card.Content>
          <Card.Content extra>
            <Feed>
              {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
            </Feed>
          </Card.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);
