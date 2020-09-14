import React from 'react';
import moment from 'moment';

const firebase = require("firebase");
require("firebase/firestore");

let interval = null,
    start = null;

function MainAdmin() {
    return(
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <h2>Zeittracker</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <form>
                        <input type="text" placeholder="Tätigkeit" className="form-control" id="description" />
                        <input type="submit" value="Start Timer" onClick={startTimer} className="btn btn-primary startButton" />
                        <input type="submit" value="Stop Timer" onClick={stopTimer} className="btn btn-danger stopButton hidden" />
                    </form>
                </div>
            </div>

            <div role="alert" aria-live="assertive" aria-atomic="true" className="toast" data-autohide="true" data-delay="5000">
                <div className="toast-header">
                    Zeittracking
                </div>
                <div className="toast-body"></div>
            </div>
        </main>
    );
}

function startTimer(event) {
    event.preventDefault();

    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0];

    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');

    start = moment();

    interval = setInterval(function() {
        let currentTime = moment().format('HH:mm:ss');
        
        stopButton.value = currentTime;
        sessionStorage.setItem('currentTime', currentTime); // TODO: Beim Aufruf der Seite prüfen, ob hier was drin steht und diese Zeit dann nehmen
    }, 1000);
}

function stopTimer(event) {
    event.preventDefault();

    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0],
        description = document.getElementById('description').value,
        end = moment();

    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');

    stopButton.value = 'Stop Timer';

    clearInterval(interval);
    sessionStorage.removeItem('currentTime');

    let duration = moment.duration(end.diff(start));
    let seconds = duration.seconds(),
        minutes = duration.minutes(),
        hours = duration.hours();

    save(start.toDate(), end.toDate(), (hours + ':' + minutes + ':' + seconds), description);
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
        window.$('.toast-body').text('Zeit wurde erfolgreich eingetragen.');
        window.$('.toast').toast('show');
    }).catch((error) => {
        window.$('.toast-body').text('Fehler beim eintragen der Zeit: ' + error);
        window.$('.toast').toast('show');
    });
}


export default MainAdmin;
