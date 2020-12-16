import React from 'react';
import { Header, Image, Grid, Card, Button, Loader } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SessionCard from '../components/SessionCard';
import { Sessions } from '../../api/session/Session';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const landingStyle = { margin: '1vh 1vw 1vh 1vw' };
    let currsessions = [];
    let upsessions = [];
    if(Meteor.userId() != null) {
        const currDate = new Date();
        console.log(currDate);
        currsessions = this.props.sessions.filter((value, index) => {
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
            const hour = (time[3] === 'pm' && parseInt(time[1]) < 12) ? (`0${(parseInt(time[1])+12)}`).slice(-2) : 
            (time[3] === 'am' && parseInt(time[1]) === 12) ? (`0${parseInt(time[1])-12}`).slice(-2) : (`0${parseInt(time[1])}`).slice(-2);
            const minute = (`0${time[2]}`).slice(-2);
            const date = new Date(`${value.year}-${months[value.month]}-${day}T${hour}:${minute}:00`);
            console.log(date);
            if(date > currDate) {
                upsessions.push(value);
            }
        });

        console.log(upsessions);
    }

    let sessions = [0, 1, 2];
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
                <Grid.Column width={10}>
                  <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
                    ONGOING SESSIONS
                  </Header>
                  <Card.Group>
                    {sessions.map((num, index) => <SessionCard key={index}/>)}
                  </Card.Group>

                  <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
                    UPCOMING SESSIONS
                  </Header>
                  <Card.Group>
                    {sessions.map((num, index) => <SessionCard key={index}/>)}
                  </Card.Group>

                  <Button style={{ marginTop: '3vh' }} color='grey'>REQUEST FOR QUICK HELP SESSION</Button>
                </Grid.Column>

                <Grid.Column width={6} verticalAlign='middle' textAlign='center'>
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
  if(Meteor.userId() === null)
  {
      return {
          ready: true,
      }
  }
  else 
  {
    const subscription = Meteor.subscribe(Sessions.userPublicationName);
    return {
        sessions: Sessions.collection.find({}).fetch(),
        ready: subscription.ready(),
    }
    }
})(Landing);
