import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import deLocale from '@fullcalendar/core/locales/de';
import moment from 'moment';

import EditModal from './editModal';

const firebase = require("firebase");
require("firebase/firestore");

class ReportContent extends React.Component {
    calendarRef = React.createRef();
    first_day = 1;

    render() {
        return(
            <main role="main" className="container-fluid">
                <div className="row flex-xl-nowrap mt-4">
                    <div className="col-12">
                        <h2>Reports</h2>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <FullCalendar
                            ref={this.calendarRef}
                            plugins={[ listPlugin ]}
                            initialView="listWeek"
                            locales={[ deLocale ]}
                            locale="de"
                            firstDay={this.first_day}
                            eventClick={(info) => {
                                this._buildEditObject(info, () => {
                                    window.$('#editEventModal').modal('show');
                                });
                            }}
                        />
                    </div>
                </div>
                <EditModal />
            </main>
        );
    }

    componentDidMount() {
        let db = firebase.firestore(),
            calendar = this.calendarRef.current.getApi(),
            sumDiffWeek = 0;

        db.collection('times').get().then((query) => {
            query.forEach((doc) => {
                let event = {
                    id: doc.id,
                    start: doc.data().start.toDate(),
                    end: doc.data().end.toDate(),
                    title: doc.data().description + ' (Zeit: ' + doc.data().hours + ':' + doc.data().minutes + ':' + doc.data().seconds + ' Std.)',
                    editable: true
                };

                calendar.addEvent(event);

                if (moment(doc.data().start.toDate()).isSame(calendar.getDate(), 'isoWeek') && moment(doc.data().end.toDate()).isSame(calendar.getDate(), 'isoWeek')) {
                    let duration = moment.duration(moment(doc.data().end.toDate()).diff(doc.data().start.toDate()));

                    sumDiffWeek += duration.asMilliseconds();
                }
            });

            window.$('.fc-header-toolbar .fc-toolbar-chunk:nth-child(2)').html('<b>Diese Woche:</b> ' + this._format(moment.duration(sumDiffWeek)) + ' Std.');
        });

        this._addClickEventsToCalendarButtons();
    }

    _buildEditObject(info, callback) {
        console.log(info);
        sessionStorage.setItem('editEventObject', JSON.stringify({
            start: info.event.start,
            end: info.event.end,
            title: info.event.title
        }));

        callback();
    }

    /**
     * Format Millisekunden Moment Duration Objekt in Stunden:Minuten:Sekunden um
     * 
     * @param {*} duration Moment Duration Objekt
     */
    _format(duration) {
        let hours = duration.hours(),
            minutes = duration.minutes(),
            seconds = duration.seconds();

        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }

    _addClickEventsToCalendarButtons() {
        let $ = window.$,
            me = this;

        $('.fc-prev-button').on('click', () => {
            this._loadSumDiffWeek();
        });
        $('.fc-next-button').on('click', () => {
            this._loadSumDiffWeek();
        });
        $('.fc-today-button').on('click', () => {
            this._loadSumDiffWeek();
        });
    }

    _loadSumDiffWeek() {
        let db = firebase.firestore(),
            calendar = this.calendarRef.current.getApi(),
            sumDiffWeek = 0;

        db.collection('times').get().then((query) => {
            query.forEach((doc) => {
                if (moment(doc.data().start.toDate()).isSame(calendar.getDate(), 'isoWeek') && moment(doc.data().end.toDate()).isSame(calendar.getDate(), 'isoWeek')) {
                    let duration = moment.duration(moment(doc.data().end.toDate()).diff(doc.data().start.toDate()));

                    sumDiffWeek += duration.asMilliseconds();
                }
            });

            window.$('.fc-header-toolbar .fc-toolbar-chunk:nth-child(2)').html('<b>Diese Woche:</b> ' + this._format(moment.duration(sumDiffWeek)) + ' Std.');
        });
    }
}

export default ReportContent;
