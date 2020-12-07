import React from 'react';
import { Header, Grid } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class QuickGuide extends React.Component {
    render() {
        const landingStyle = { marginTop: '15px' };
        return (
            <div>
                    <Grid verticalAlign='middle' container style={landingStyle}>
                        <Grid.Row textAlign='center'>
                            <Grid.Column>
                                <Header as='h2' style={{ color: '#585C67' }}>
                                    <b className='focus-header'>Welcome to study-ext!</b>
                                    <br/>
                                    Here is a quick guide to help you get started.
                                </Header>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row textAlign='left'>
                            <Grid.Column width={10}>
                                <Header style={{ color: 'white' }}>
                                    The home page shows everything current. You can see ongoing and upcoming study
                                    sessions,
                                    request for quick study help, along with the Top 10 Leaderboard.
                                </Header>
                                <Header>
                                    The calender page shows all the upcoming sessions.
                                    There you can look at the different topics, time, and members to see if you want to join a session!
                                </Header>
                            </Grid.Column>
                            <Grid.Column width={6}>

                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
            </div>
        );
    }
}

export default QuickGuide;
