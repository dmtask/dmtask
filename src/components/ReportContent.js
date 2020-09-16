import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import deLocale from '@fullcalendar/core/locales/de';
import moment from 'moment';

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
                        />
                    </div>
                </div>
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
                    title: doc.data().description + ' (Zeit: ' + doc.data().hours + ':' + doc.data().minutes + ':' + doc.data().seconds + ')',
                    editable: false
                };

                calendar.addEvent(event);

                if (moment(doc.data().start.toDate()).isSame(calendar.getDate(), 'isoWeek') && moment(doc.data().end.toDate()).isSame(calendar.getDate(), 'isoWeek')) {
                    let duration = moment.duration(moment(doc.data().end.toDate()).diff(doc.data().start.toDate()));

                    sumDiffWeek += duration.asMilliseconds();
                }
            });

            window.$('.fc-header-toolbar .fc-toolbar-chunk:nth-child(2)').html('<b>Diese Woche:</b> ' + this._format(moment.duration(sumDiffWeek)));
        });
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
}

export default ReportContent;
