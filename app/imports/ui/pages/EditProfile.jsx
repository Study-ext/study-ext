import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, LongTextField, SubmitField, HiddenField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { CurrentClasses } from '../../api/classes/CurrentClasses';
import { TakenClasses } from '../../api/classes/TakenClasses';
import { Profiles } from '../../api/profile/Profiles';
import { ProfilesCurrentClasses } from '../../api/profile/ProfilesCurrentClasses';
import { ProfilesTakenClasses } from '../../api/profile/ProfilesTakenClasses';
import { updateProfileMethod } from '../../startup/both/Methods';

const bridge = new SimpleSchema2Bridge(Profiles.schema);

/** Renders the Page for editing a document. */
class EditProfile extends React.Component {

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    const { name, email, picture, currentClasses, takenClasses, bio, _id } = data;
    Profiles.collection.update(_id, { $set: { name, email, picture, currentClasses, takenClasses, bio } },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile updated successfully', 'success');
          }
        });
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
          <Header inverted style={{ fontSize: '4vh', fontFamily: 'Courier' }}>Edit Profile</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc._id}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='name' name='name' showInlineError={true} placeholder={'Your name'}/>
                <TextField id='email' name='email' showInlineError={true} placeholder={'Your email'}/>
                <TextField id='picture' name='picture' showInlineError={true} placeholder={'Picture URL'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <MultiSelectField name='currentClasses' showInlineError={true}
                                  placeholder={'Select current classes'}/>
                <MultiSelectField name='takenClasses' showInlineError={true}
                                  placeholder={'Select classes already taken'}/>
              </Form.Group>
              <LongTextField id='bio' name='bio' showInlineError={true} placeholder={'A bit about you'}/>
              <SubmitField id='edit-profile-page-submit' value='Update'/>
              <HiddenField name='owner'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
  );
}
}

/** Require a doc.  Uniforms adds 'model' to the props, which we use. */
EditProfile.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Request Profiles docs. Won't be locally available until ready() returns true.
  const sub1 = Meteor.subscribe(CurrentClasses.userPublicationName);
  const sub2 = Meteor.subscribe(TakenClasses.userPublicationName);
  const sub3 = Meteor.subscribe(Profiles.userPublicationName);
  const sub4 = Meteor.subscribe(ProfilesCurrentClasses.userPublicationName);
  const sub5 = Meteor.subscribe(ProfilesTakenClasses.userPublicationName);
  return {
    doc: Profiles.collection.findOne({ documentId }),
    ready: sub1.ready() && sub2.ready() && sub3.ready() && sub4.ready() && sub5.ready(),
  };
})(EditProfile);
