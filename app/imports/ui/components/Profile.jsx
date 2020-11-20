import React from 'react';
import { Item, Image, Feed, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Item>
          <Item.Image
              src={this.props.profile.image}
              size='small'
          />

          <Item.Content floated='right'>
            <Item.Header>Name: {this.props.profile.firstName} {this.props.profile.lastName}</Item.Header>
            <Item.Meta>Address: {this.props.profile.address}</Item.Meta>
            <Item.Description>Description: {this.props.profile.description}</Item.Description>

            <Item.Extra>
              <Link to={`/edit/${this.props.profile._id}`}>Edit</Link>
            </Item.Extra>
            <Item.Extra>
              <Feed>
                {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
              </Feed>
            </Item.Extra>
            <Item.Extra>
              <AddNote owner={this.props.profile.owner} profileId={this.props.profile._id}/>
            </Item.Extra>
          </Item.Content>
        </Item>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(Profile);
