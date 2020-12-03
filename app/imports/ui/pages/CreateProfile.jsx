import React from 'react';
import { Grid, Segment, Header, Form, Message } from 'semantic-ui-react';
import { AutoForm, TextField, LongTextField, ErrorsField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { ProfileData } from '../../api/profile/ProfileData';
import MultiSelectField from '../forms/controllers/MultiSelectField';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  email: { type: String, optional: true},
  picture: String,
  currentClasses: { type: Array },
  'currentClasses.$': { type: String,
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
  'takenClasses.$': { type: String,
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

  constructor(props) {
    super(props);
    this.state = { email: false };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, email, picture, currentClasses, takenClasses, bio } = data;
    const owner = Meteor.user().username;
    ProfileData.collection.insert({ name, email, picture, currentClasses, takenClasses, bio, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile created successfully', 'success');
            this.setState({ email });
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header style={{ fontSize: '5vh', color: 'white', fontFamily: 'Courier' }}>
              CREATE YOUR PROFILE
            </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Form.Group widths={'equal'}>
                <TextField name='name'/>
                <TextField name='email' disabled/>
                <TextField name='picture'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                <MultiSelectField name='currentClasses'/>
                <MultiSelectField name ='takenClasses'/>
                </Form.Group>
                <LongTextField name='bio'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
            {this.state.email ? <Message>Edit <a href={`/#/profile${this.state.email}`}>your profile</a></Message> : '' }
          </Grid.Column>
        </Grid>
    );
  }
}

export default CreateProfile;
