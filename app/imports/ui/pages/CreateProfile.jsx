import React from 'react';
import { Grid, Segment, Header, Form, Message } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, DateField, LongTextField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import RadioField from '../forms/controllers/RadioField';
import { ProfileFormSchema as formSchema, gpa2Number } from '../forms/ProfileFormInfo';
import { ProfileData } from '../../api/profile/ProfileData';
import { EnrollmentData } from '../../api/enrollmentdata/EnrollmentData';

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '' };
  }


  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let insertError;
    const { name, email, image, takenCourses, currentCourses, bio, level, gpa, enrolled, major } = data;
    ProfileData.insert({ name, email, image, takenCourses, currentCourses, bio, level, gpa: gpa2Number(gpa), major },
        (error) => {
          insertError = error;
        });
    if (insertError) {
      swal('Error', insertError.message, 'error');
    } else {
      EnrollmentData.insert({ email, enrolled },
          (error) => {
            insertError = error;
          });
      if (insertError) {
        swal('Error', insertError.message, 'error');
      } else {
        swal('Success', 'Your profile was created.', 'success');
        this.setState({ email });
      }
    }
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header inverted as="h2" textAlign="center">Create Profile</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='name' showInlineError={true} placeholder={'Your name'}/>
                  <TextField name='email' showInlineError={true}/>
                  <TextField name='image' showInlineError={true} placeholder={'Image URL'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='takenCourses' showInlineError={true}
                                    placeholder={'Select courses already taken'}/>
                  <MultiSelectField name='currentCourses' showInlineError={true}
                                    placeholder={'Select courses currently taking'}/>
                </Form.Group>
                <LongTextField name='bio' showInlineError={true} placeholder={'A bit about you'}/>
                <Form.Group widths={'equal'}>
                  <SelectField name='level' showInlineError={true}/>
                  <SelectField name='gpa' showInlineError={true} placeholder={'Select one'}/>
                  <DateField name='enrolled' showInlineError={true}/>
                </Form.Group>
                <RadioField name='major' inline showInlineError={true}/>
                <SubmitField value='Submit'/>
              </Segment>
            </AutoForm>
            {this.state.email ?
                <Message>Edit <a href={`/#/editprofile/${this.state.email}`}>your profile</a></Message> : ''}
          </Grid.Column>
        </Grid>
    );
  }
}

export default CreateProfile;
