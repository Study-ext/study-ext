import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { updateProfileMethod } from '../../startup/both/Methods';
import { CurrentClasses } from '../../api/classes/CurrentClasses';
import { TakenClasses } from '../../api/classes/TakenClasses';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';

/** Create a schema to specify the structure of the data to appear in the form. */
const makeSchema = (allCurrentClasses, allTakenClasses) => new SimpleSchema({
  name: { type: String, label: 'Name' },
  email: { type: String, label: 'Email', optional: true },
  picture: { type: String, label: 'Picture URL' },
  bio: { type: String, label: 'Biographical statement', optional: true },
  currentClasses: { type: Array, label: 'Current Classes', optional: true },
  'currentClasses.$': { type: String, allowedValues: allCurrentClasses },
  takenClasses: { type: Array, label: 'Taken Classes', optional: true },
  'takenClasses.$': { type: String, allowedValues: allTakenClasses },
});

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {
  /** Initialize state fields. */
  // constructor(props) {
  //   super(props);
  //   this.state = { name: '', email: '', picture: '', currentClasses: '', takenClasses: '', error: '', redirectToReferer: false };
  // }
  //
  // /** Update the form controls each time the user interacts with them. */
  // handleChange= (e, { name, value }) => {
  //   this.setState({ [name]: value });
  // }

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile created successfully', 'success');
            // this.setState({ redirectToReferer: true });
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/quickguide' } };
    // // if correct authentication, redirect to from: page instead of signup screen
    // if (this.state.redirectToReferer) {
    //   return <Redirect to={from}/>;
    // }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    // let fRef = null;
    const email = Meteor.user().username;
    const allCurrentClasses = _.uniq(_.pluck(CurrentClasses.collection.find().fetch(), 'name'));
    const allTakenClasses = _.uniq(_.pluck(TakenClasses.collection.find().fetch(), 'name'));
    const formSchema = makeSchema(allCurrentClasses, allTakenClasses);
    const bridge = new SimpleSchema2Bridge(formSchema);
    // Create the model with all the user information.
    const currentClasses = _.pluck(ProfilesCurrentClasses.collection.find({ profile: email }).fetch(), 'currentClass');
    const takenClasses = _.pluck(ProfilesTakenClasses.collection.find({ profile: email }).fetch(), 'takenClass');
    const profile = Profiles.collection.findOne({ email });
    const model = _.extend({}, profile, { currentClasses, takenClasses });
    return (
        <Grid id='create-profile-page' container centered>
          <Grid.Column>
            <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
              CREATE YOUR PROFILE
            </Header>
            <AutoForm model={model} schema={bridge} onSubmit={data => this.submit(data)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField id='name' name='name' showInlineError={true} placeholder={'Your name'}/>
                  <TextField id='email' name='email' showInlineError={true} placeholder={'Your email'} disabled/>
                  <TextField id='picture' name='picture' showInlineError={true} placeholder={'Picture URL'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='currentClasses' showInlineError={true}
                                    placeholder={'Select current classes'}/>
                  <MultiSelectField name='takenClasses' showInlineError={true}
                                    placeholder={'Select classes already taken'}/>
                </Form.Group>
                <LongTextField id='bio' name='bio' showInlineError={true} placeholder={'A bit about you'}/>
                <SubmitField id='create-profile-page-submit' value='Submit'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
CreateProfile.propTypes = {
  // location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(CurrentClasses.userPublicationName);
  const sub2 = Meteor.subscribe(TakenClasses.userPublicationName);
  const sub3 = Meteor.subscribe(Profiles.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub5 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);

  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(CreateProfile);
