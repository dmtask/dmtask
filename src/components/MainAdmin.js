import React from 'react';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';

const firebase = require("firebase");
require("firebase/firestore");

let interval = null,
    start = null;

function MainAdmin() {
    return(
        <main role="main" className="container-fluid mb-4">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <h2>Zeittracker</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-8">
                    <form>
                        <input type="text" placeholder="Tätigkeit" className="form-control" id="description" />
                        <input type="submit" value="Start Timer" onClick={startTimer} className="btn btn-primary startButton" />
                        <input type="submit" value="Stop Timer" onClick={stopTimer} className="btn btn-danger stopButton hidden" />
                    </form>
                </div>
                <div className="col-2">
                <input type="text" placeholder="Startzeit" className="form-control" id="startTimeInput" />
                </div>
                <div id="timeCounter" className="col-2"></div>
            </div>
            <ToastContainer />
        </main>
    );
}

function startTimer(event) {
    event.preventDefault();

    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0],
        startTimeInput = document.getElementById('startTimeInput').value;

    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');

    if (startTimeInput !== '') {
        start = moment(startTimeInput, 'HH:mm');
    } else {
        start = moment();
    }

    interval = setInterval(function() {
        let currentTime = moment();
        let duration = moment.duration(currentTime.diff(start));
        let seconds = _pad(duration.seconds()),
            minutes = _pad(duration.minutes()),
            hours = _pad(duration.hours());

        document.getElementById('timeCounter').innerText = (hours + ':' + minutes + ':' + seconds);

        sessionStorage.setItem('currentTime', currentTime);
        sessionStorage.setItem('currentTimeCounter', (hours + ':' + minutes + ':' + seconds));

        _checkSessionStorage();
    }, 1000);
}

function stopTimer(event) {
    event.preventDefault();

    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0],
        description = document.getElementById('description').value,
        end = moment(sessionStorage.getItem('currentTime')),
        timeCounter = sessionStorage.getItem('currentTimeCounter');

    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');

    clearInterval(interval);
    sessionStorage.removeItem('currentTime');
    sessionStorage.removeItem('currentTimeCounter');

    document.getElementById('timeCounter').innerText = '';

    //save(start.toDate(), end.toDate(), timeCounter, description);
}

function save(start, end, diff, description) {
    let db = firebase.firestore(),
        difference = diff.split(':');

    db.collection("times").add({
        hours: difference[0],
        minutes: difference[1],
        seconds: difference[2],
        end: end,
        start: start,
        description: description || ''
    }).then(() => {
        toast.success('Zeit wurde erfolgreich eingetragen.');
    }).catch((error) => {
        toast.error('Fehler beim eintragen der Zeit: ' + error);
    });
}

function _pad(value) {
    if (value.toString().length < 2) {
        return '0' + value;
    } else {
        return value;
    }
}

function _checkSessionStorage() {
    if (sessionStorage.getItem('currentTime') !== null && sessionStorage.getItem('currentTimeCounter') !== null) {
        window.onbeforeunload = () => {
            return '';
        };
    }
}

export default MainAdmin;
