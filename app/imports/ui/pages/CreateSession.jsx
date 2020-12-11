import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, DateField } from 'uniforms-semantic';
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
  date: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class CreateSession extends React.Component {
  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, subject, info, date } = data;
    const owner = Meteor.user().username;

    const time = date.getTime();

    const offset = date.getTimezoneOffset() * 60 * 1000;

    const newTime = time + offset;

    const newDate = new Date(newTime);

    const timeStr = `${(`0${newDate.getHours()}`).slice(-2)}:${(`0${newDate.getMinutes()}`).slice(-2)}`;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    Sessions.collection.insert({ name, subject, info, time: timeStr, month: monthNames[newDate.getMonth()], day: newDate.getDate().toString(), year: newDate.getFullYear().toString(), owner },
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
                <DateField name='date' />
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
