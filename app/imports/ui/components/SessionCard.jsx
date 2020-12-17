import React from 'react';
import { Button, Card, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  setOpen(value) {
    this.setState({ open: value });
  }

  render() {
    let day;
    if ((this.props.sessions.day % 10) === 1) {
      day = `${this.props.sessions.day}st`;
    } else if ((this.props.sessions.day % 10) === 2) {
      day = `${this.props.sessions.day}nd`;
    } else if ((this.props.sessions.day % 10) === 3) {
      day = `${this.props.sessions.day}rd`;
    } else {
      day = `${this.props.sessions.day}th`;
    }

    const date = ` ${this.props.sessions.month} ${day}, ${this.props.sessions.year}`;
    let info = this.props.sessions.info;
    let expand = true;

    if (this.props.sessions.info.length > 30) {
      info = `${this.props.sessions.info.substring(0, 27)}...`;
      expand = false;
    }

    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.sessions.name}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Description>
            Date:
            {date}
            <br />
            Time:
            {` ${this.props.sessions.time}`}
            <br />
            Course:
            {` ${this.props.sessions.subject}`}
            <br />
            Description:
            {` ${info}`}
            <br />
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Modal
            onClose={() => this.setOpen(false)}
            onOpen={() => this.setOpen(true)}
            open={this.state.open}
            trigger={
              <Button disabled={expand} color={(expand === false ? 'green' : 'red')} basic>{(expand === false) ? 'Click Here to see more info' : 'There are no extra info given'}</Button>
            }
            closeIcon
          >
            <Modal.Header>{this.props.sessions.name}</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                Date:
                {date}
                <br />
                Time:
                {` ${this.props.sessions.time}`}
                <br />
                Course:
                {` ${this.props.sessions.subject}`}
                <br />
                Description:
                {` ${this.props.sessions.info}`}
                <br />
              </Modal.Description>
            </Modal.Content>
          </Modal>
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
