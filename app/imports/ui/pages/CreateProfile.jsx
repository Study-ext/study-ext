import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, ErrorsField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Profiles } from '../../api/profile/Profiles';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  email: { type: String, optional: true },
  picture: String,
  currentClasses: { type: Array },
  'currentClasses.$': {
    type: String,
    allowedValues: [
      'ICS 111',
      'ICS 141',
      'ICS 211',
      'ICS 212',
      'ICS 222',
      'ICS 241',
      'ICS 311',
      'ICS 314',
    ],
  },
  takenClasses: { type: Array },
  'takenClasses.$': {
    type: String,
    allowedValues: [
      'ICS 111',
      'ICS 141',
      'ICS 211',
      'ICS 212',
      'ICS 222',
      'ICS 241',
      'ICS 311',
      'ICS 314',
    ],
  },
  bio: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {
  /** Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', picture: '', currentClasses: '', takenClasses: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange= (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** On submit, insert the data. */
  submit(data) {
    const { name, email, picture, currentClasses, takenClasses, bio } = data;
    const owner = Meteor.user().username;
    Profiles.collection.insert({ name, email, picture, currentClasses, takenClasses, bio, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile created successfully', 'success');
            this.setState({ redirectToReferer: true });
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const { from } = this.props.location.state || { from: { pathname: '/viewprofile' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
        <Grid container centered>
          <Grid.Column>
            <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
              CREATE YOUR PROFILE
            </Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='name' showInlineError={true} placeholder={'Your name'}/>
                  <TextField name='email' showInlineError={true} placeholder={'Your email'} disabled/>
                  <TextField name='picture' showInlineError={true} placeholder={'Picture URL'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='currentClasses' showInlineError={true}
                                    placeholder={'Select current classes'}/>
                  <MultiSelectField name='takenClasses' showInlineError={true}
                                    placeholder={'Select classes already taken'}/>
                </Form.Group>
                <LongTextField name='bio' showInlineError={true} placeholder={'A bit about you'}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
CreateProfile.propTypes = {
  location: PropTypes.object,
};

export default CreateProfile;
