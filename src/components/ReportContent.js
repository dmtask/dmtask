import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import deLocale from '@fullcalendar/core/locales/de';
import moment from 'moment';

const firebase = require("firebase");
require("firebase/firestore");

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
            sumDiffDay = [],
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

                if (moment(doc.data().end.toDate()).isSame(calendar.getDate(), 'day')) {
                    let duration = moment.duration(moment(doc.data().end.toDate()).diff(doc.data().start.toDate()));

                    sumDiffDay.push({
                        day: moment(doc.data().end.toDate()),
                        duration: duration.milliseconds()
                    });
                }
            });

            console.log(sumDiffDay);

            /*let sum = 0;
            for (let i = 0; i < sumDiffDay.length; i++) {
                console.log(sumDiffDay[i].day.format('YYYY-MM-DD'));
                console.log(window.$('tr.fc-list-day').attr('data-date'));
                console.log(window.$('tr.fc-list-day').attr('data-date') === sumDiffDay[i].day.format('YYYY-MM-DD'));

                if (window.$('tr.fc-list-day').attr('data-date') === sumDiffDay[i].day.format('YYYY-MM-DD')) {
                    sum += sumDiffDay[i].duration;
                }

                

                window.$('tr.fc-list-day[data-date=' + sumDiffDay[i].day.format('YYYY-MM-DD') + '] a.fc-list-day-text').append(' <b>Gesamt:</b> ' + );
            }*/
        });
    }
}

export default ReportContent;
