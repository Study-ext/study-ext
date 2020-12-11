import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, LongTextField, SubmitField, ErrorsField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { Profiles } from '../../api/profile/Profiles';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the Page for editing a document. */
class EditProfile extends React.Component {

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    const { name, email, picture, currentClasses, takenClasses, bio, _id } = data;
    Profiles.collection.update(_id, {
          $set: {
            name,
            email,
            picture,
            currentClasses,
            takenClasses,
            bio,
          },
        },
        (error) => (error ?
            swal('Error', error.message, 'error') :
            swal('Success', 'Profile updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header inverted as="h2" textAlign="center">Edit Profile</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='name' showInlineError={true} placeholder={'Your name'}/>
                  <TextField name='email' showInlineError={true} placeholder={'Your email'}/>
                  <TextField name='picture' showInlineError={true} placeholder={'Picture URL'}/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='currentClasses' showInlineError={true} placeholder={'Select current classes'}/>
                  <MultiSelectField name='takenClasses' showInlineError={true} placeholder={'Select classes already taken'}/>
                </Form.Group>
                <LongTextField name='bio' showInlineError={true} placeholder={'A bit about you'}/>
                <SubmitField value='Update'/>
                <ErrorsField/>
                <HiddenField name ='owner'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require a studentdata and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the email from the URL field. See imports/ui/layouts/App.jsx for the route containing :email.
  const documentId = match.params._id;
  // Request StudentData and Enrollment docs. Won't be locally available until ready() returns true.
  const profilesSubscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    doc: Profiles.collection.findOne(documentId),
    ready: profilesSubscription.ready(),
  };
})(EditProfile);