import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListProfileAdmin extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.profile.name}</Table.Cell>
          <Table.Cell>{this.props.profile.email}</Table.Cell>
          <Table.Cell>{this.props.profile.rank}</Table.Cell>
          <Table.Cell>{this.props.profile.currentClasses}</Table.Cell>
          <Table.Cell>{this.props.profile.takenClasses}</Table.Cell>
          <Table.Cell>{this.props.profile.bio}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListProfileAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default withRouter(ListProfileAdmin);
