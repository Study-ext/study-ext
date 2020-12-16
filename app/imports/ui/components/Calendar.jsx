import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PropTypes from 'prop-types';

export default class Calendar extends React.Component {
  render() {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={this.props.sessions}
        />
    );
  }
}

Calendar.propTypes = {
  sessions: PropTypes.array.isRequired,
};