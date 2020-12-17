import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Popup, Button, Modal, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListProfileAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  removeUser(docID, current, taken) {
    const user = this.props.Users.find((value) => value.emails[0].address === this.props.profile.email);
    let admin = false;
    if (user) {
      Meteor.users.remove({ _id: user._id }, function (error) {
        if (error) {
          admin = true;
        }
      });
    }

    if (admin === false) {
      this.props.Profiles.collection.remove(docID);
      current.forEach((value) => this.props.Currents.collection.remove(value._id));
      taken.forEach((value) => this.props.Takens.collection.remove(value._id));
      this.setOpen(false);
    }
  }

  render() {
    const current =
      this.props.current.length === 0
        ? 'No current classes'
        : this.props.current.map((value) => value.currentClass).join(', ');
    const taken =
      this.props.taken.length === 0
        ? 'No classes taken'
        : this.props.taken.map((value) => value.takenClass).join(', ');
    return (
      <Table.Row>
        <Table.Cell>{this.props.profile.name}</Table.Cell>
        <Table.Cell>{this.props.profile.email}</Table.Cell>
        <Table.Cell>{this.props.profile.rank}</Table.Cell>
        <Table.Cell>
          <Popup content={current} trigger={<Button icon="triangle up" />} />
        </Table.Cell>
        <Table.Cell>
          <Popup content={taken} trigger={<Button icon="triangle up" />} />
        </Table.Cell>
        <Table.Cell>{this.props.profile.bio}</Table.Cell>
        <Table.Cell>
          <Modal
            closeIcon
            open={this.state.open}
            trigger={<Button basic color="red" icon="trash" />}
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
          >
            <Header icon="trash" content="Delete User" />
            <Modal.Content>
              <p>Are you sure you want to delete this User?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button
                color="green"
                onClick={() => this.removeUser(this.props.profile._id, this.props.current, this.props.taken)}
              >
                <Icon name="checkmark" /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        </Table.Cell>
      </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListProfileAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
  current: PropTypes.array.isRequired,
  taken: PropTypes.array.isRequired,
  Profiles: PropTypes.object,
  Currents: PropTypes.object,
  Takens: PropTypes.object,
  Users: PropTypes.array,
};

export default withRouter(ListProfileAdmin);
