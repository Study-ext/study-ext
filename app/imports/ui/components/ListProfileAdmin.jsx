import React from 'react';
import { Table, Popup, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ListProfileAdmin extends React.Component {
  render() {
    const current = (this.props.current.length === 0) ? 'No current classes' : this.props.current.join(', ');
    const taken = (this.props.taken.length === 0) ? 'No classes taken' : this.props.taken.join(', ');

    return (
        <Table.Row>
          <Table.Cell>{this.props.profile.name}</Table.Cell>
          <Table.Cell>{this.props.profile.email}</Table.Cell>
          <Table.Cell>{this.props.profile.rank}</Table.Cell>
          <Table.Cell>
            <Popup content={current} trigger={<Button icon='triangle up' />} />
          </Table.Cell>
          <Table.Cell>
            <Popup content={taken} trigger={<Button icon='triangle up' />} />
          </Table.Cell>
          <Table.Cell>{this.props.profile.bio}</Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
ListProfileAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
  current: PropTypes.array.isRequired,
  taken: PropTypes.array.isRequired,
};

export default withRouter(ListProfileAdmin);
