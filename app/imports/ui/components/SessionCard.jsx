import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionCard extends React.Component {
    render() {
        const date = ` ${this.props.sessions.month} ${this.props.sessions.day} ${this.props.sessions.year}`;
        return (
            <Card>
                <Card.Content>
                    <Card.Header>{this.props.sessions.name}</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        Date:
                        {date}
                        <br/>
                        Time:
                        {` ${this.props.sessions.time}`}
                        <br/>
                        Course:
                        {` ${this.props.sessions.subject}`}
                        <br/>
                        Description:
                        {` ${this.props.sessions.info}`}
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
