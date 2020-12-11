import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListSessionAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.session.name}</Table.Cell>
          <Table.Cell>{this.props.session.subject}</Table.Cell>
          <Table.Cell>{this.props.session.info}</Table.Cell>
          <Table.Cell>{this.props.session.time}</Table.Cell>
          <Table.Cell>{this.props.session.month}</Table.Cell>
          <Table.Cell>{this.props.session.day}</Table.Cell>
          <Table.Cell>{this.props.session.year}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListSessionAdmin.propTypes = {
  session: PropTypes.object.isRequired,
};

export default withRouter(ListSessionAdmin);
