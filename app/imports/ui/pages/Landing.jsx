import React from 'react';
import { Header, Image, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <Grid id = 'landing-page' textAlign='center' verticalAlign='middle' container>
            <Grid.Column width={8}>
              <Header as='h2' textAlign='center' inverted>
                LOGIN OR REGISTER TO JOIN/CREATE A STUDY GROUP!
              </Header>
              <Header as='h4' textAlign='center' inverted>
                EARN POINTS BY ATTENDING STUDY SESSIONS.<br />
                MAKE YOUR WAY TO THE TOP.
              </Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Image size='medium' src="/images/temp-leaderboard.png"/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
