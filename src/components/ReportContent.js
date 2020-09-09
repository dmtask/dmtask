import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import deLocale from '@fullcalendar/core/locales/de';
import moment from 'moment';

const firebase = require("firebase");
require("firebase/firestore");

let events = [];

class ReportContent extends React.Component {
    calendarRef = React.createRef();

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
                        />
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        let db = firebase.firestore(),
            calendar = this.calendarRef.current.getApi(),
            sumDiff = 0;
        
        db.collection('times').get().then((query) => {
            query.forEach((doc) => {
                let event = {
                    id: doc.id,
                    start: doc.data().start.toDate(),
                    end: doc.data().end.toDate(),
                    title: doc.data().description + ' (Zeit: ' + moment(doc.data().difference, 'HH:mm:ss').format('HH:mm:ss') + ')',
                    editable: false
                };

                calendar.addEvent(event);

                sumDiff += moment(doc.data().difference, 'HH:mm:ss').valueOf();
            });

            console.log(sumDiff);
            console.log(moment(sumDiff).format('HH:mm:ss'));

            window.$('a.fc-list-day-text').append(' <b>Gesamt:</b> ' + moment(sumDiff).format('HH:mm:ss'));
        });
    }
}

export default ReportContent;
