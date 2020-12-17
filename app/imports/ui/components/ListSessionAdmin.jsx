import React from 'react';
import { Table, Modal, Button, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListSessionAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  removeSession(docID) {
    this.props.Sessions.collection.remove(docID);
    this.setOpen(false);
  }

  render() {
    const date = ` ${this.props.session.month} ${this.props.session.day}, ${this.props.session.year}`;
    return (
      <Table.Row>
        <Table.Cell>{this.props.session.name}</Table.Cell>
        <Table.Cell>{this.props.session.subject}</Table.Cell>
        <Table.Cell>{this.props.session.info}</Table.Cell>
        <Table.Cell>{this.props.session.time}</Table.Cell>
        <Table.Cell>{date}</Table.Cell>
        <Table.Cell>
          <Modal
            closeIcon
            open={this.state.open}
            trigger={<Button basic color='red' icon='trash' />}
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
          >
            <Header icon="trash" content="Delete Session" />
            <Modal.Content>
              <p>
                Are you sure you want to delete this Session?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="red" onClick={() => this.setOpen(false)}>
                <Icon name="remove" /> No
              </Button>
              <Button color="green" onClick={() => this.removeSession(this.props.session._id)}>
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
ListSessionAdmin.propTypes = {
  session: PropTypes.object.isRequired,
  Sessions: PropTypes.object.isRequired,
};

export default withRouter(ListSessionAdmin);
