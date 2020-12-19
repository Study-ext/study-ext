import React from 'react';
import { Header, Image, Grid, Card, Button, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SessionCard from '../components/SessionCard';
import { Sessions } from '../../api/session/Session';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currIndex: 0,
      upIndex: 0,
    };
  }

  incIndex = (value, index) => {
    if (value + 3 < this.props.sessions.length) {
      if (index === 'currIndex') {
       this.setState({ currIndex: this.state.currIndex + 3 });
      } else {
        this.setState({ upIndex: this.state.upIndex + 3 });
      }
    }
  }

  decIndex = (value, index) => {
    if (value - 3 >= 0) {
      if (index === 'currIndex') {
        this.setState({ currIndex: this.state.currIndex - 3 });
      } else {
        this.setState({ upIndex: this.state.upIndex - 3 });
      }
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const landingStyle = { margin: '1vh 1vw 1vh 1vw' };
    let currsessions = [];
    let upsessions = [];
    let currNext = false;
    let currPrev = false;
    let upNext = false;
    let upPrev = false;

    if (Meteor.userId() != null) {
        const currDate = new Date();
        this.props.sessions.forEach((value) => {
            const months = {
                January: '01',
                February: '02',
                March: '03',
                April: '04',
                May: '05',
                June: '06',
                July: '07',
                August: '08',
                September: '09',
                October: '10',
                November: '11',
                December: '12' };
            const day = (`0${value.day}`).slice(-2);
            const time = value.time.match(/(\w+):(\w+)\s(am|pm)/);
            let hour = (time[3] === 'pm' && parseInt(time[1], 10) < 12) ? (`0${(parseInt(time[1], 10) + 12)}`).slice(-2) : 0;
            hour = (time[3] === 'am' && parseInt(time[1], 10) === 12) ? (`0${parseInt(time[1], 10) - 12}`).slice(-2) : (`0${parseInt(time[1], 10)}`).slice(-2);
            const minute = (`0${time[2]}`).slice(-2);
            const date = new Date(`${value.year}-${months[value.month]}-${day}T${hour}:${minute}:00`);
            date.setHours(0, 0, 0, 0);
            currDate.setHours(0, 0, 0, 0);

            if (date.getTime() === currDate.getTime()) {
                currsessions.push(value);
            }

            if (date > currDate) {
                upsessions.push(value);
            }
        });
    }

    if (this.state.currIndex + 3 >= currsessions.length) {
      currNext = true;
    }

    if (this.state.currIndex === 0) {
      currPrev = true;
    }

    if (this.state.upIndex + 3 >= upsessions.length) {
      upNext = true;
    }

    if (this.state.upIndex === 0) {
      upPrev = true;
    }

    currsessions = currsessions.slice(this.state.currIndex, this.state.currIndex + 3);
    upsessions = upsessions.slice(this.state.upIndex, this.state.upIndex + 3);

    return (
        <div id='landing-page'>
          {Meteor.userId() === null ?
              <Grid textAlign='center' verticalAlign='middle' container style={landingStyle}>
                <Grid.Column width={8}>
                  <Header as='h2' textAlign='center' inverted>
                    LOGIN OR REGISTER TO JOIN/CREATE A STUDY GROUP!
                  </Header>
                  <Header as='h4' textAlign='center' inverted>
                    EARN POINTS BY ATTENDING STUDY SESSIONS.<br/>
                    MAKE YOUR WAY TO THE TOP.
                  </Header>
                </Grid.Column>
                <Grid.Column width={4}>
                  <Image size='medium' src="/images/temp-leaderboard.png"/>
                </Grid.Column>
              </Grid>
              :
              <Grid verticalAlign='middle' style={landingStyle}>
                <Grid.Column width={12}>
                  <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
                    TODAY SESSIONS
                  </Header>

                  <Card.Group>
                    <Button icon='angle left' circular style={{ height: '3.5vh', alignSelf: 'center' }} onClick={this.decIndex.bind(this, this.state.currIndex, 'currIndex')} disabled={currPrev}/>
                    {currsessions.map((num, index) => <SessionCard key={index} sessions={num}/>)}
                    <Button icon='angle right' circular style={{ height: '3.5vh', alignSelf: 'center' }} onClick={this.incIndex.bind(this, this.state.currIndex, 'currIndex')} disabled={currNext}/>
                  </Card.Group>

                  <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
                    UPCOMING SESSIONS
                  </Header>
                  <Card.Group>
                    <Button icon='angle left' circular style={{ height: '3.5vh', alignSelf: 'center' }} onClick={this.decIndex.bind(this, this.state.upIndex, 'upIndex')} disabled={upPrev}/>
                    {upsessions.map((num, index) => <SessionCard key={index} sessions={num}/>)}
                    <Button icon='angle right' circular style={{ height: '3.5vh', alignSelf: 'center' }} onClick={this.incIndex.bind(this, this.state.upIndex, 'upIndex')} disabled={upNext}/>
                  </Card.Group>

                  <Button style={{ marginTop: '3vh' }} color='grey' as={NavLink} exact to="/createSession">REQUEST FOR QUICK HELP SESSION</Button>
                </Grid.Column>

                <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
                  <Image size='medium' src="/images/temp-leaderboard.png" centered/>
                </Grid.Column>
              </Grid>
          }
        </div>
    );
  }
}

Landing.propTypes = {
  sessions: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Sessions documents.
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    return {
        sessions: Sessions.collection.find({}).fetch(),
        ready: subscription.ready(),
    };

})(Landing);
