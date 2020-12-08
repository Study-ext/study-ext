import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Class extends React.Component {
  render() {
    return (
        <Card centered fluid>
          <Card.Content>
            <Card.Header>
              {this.props.profile.takenClasses}
            </Card.Header>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Class.propTypes = {
  class: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the
 <Link> React Router element. */
export default withRouter(Class);
