import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionCard extends React.Component {
    render() {
        return (
            <Card>
                <Card.Content>
                    <Card.Header>ICS 314 Help</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        Date: 18, February 2021
                        <br/>
                        Time:
                        <br/>
                        Place:
                        <br/>
                        Course:
                        <br/>
                        Description:
                        <br/>
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Button basic color='green'>Join</Button>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
SessionCard.propTypes = {
    sessions: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SessionCard);
