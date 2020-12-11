import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Sessions } from '../../api/session/Session';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  subject: {
    type: String,
    allowedValues: ['ICS 111', 'ICS 141', 'ICS 211', 'ICS 212', 'ICS 222', 'ICS 241', 'ICS 311', 'ICS 314'],
  },
  info: String,
  time: String,
  month: {
    type: String,
    allowedValues: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
    defaultValue: 'December',
  },
  day: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
      '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    defaultValue: '1',
  },
  year: {
    type: String,
    allowedValues: ['2020', '2021', '2022', '2023', '2024', '2025'],
    defaultValue: '2020',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateSession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, subject, info, time, month, day, year } = data;
    const owner = Meteor.user().username;
    Sessions.collection.insert({ name, subject, info, time, month, day, year, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
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
            <Header style={{ fontSize: '4vh', color: 'white', fontFamily: 'Courier' }}>
              CREATE A NEW SESSION
            </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='name'/>
                <SelectField name='subject'/>
                <TextField name='info'/>
                <TextField name='time'/>
                <SelectField name='month'/>
                <SelectField name='day'/>
                <SelectField name='year'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default CreateSession;
