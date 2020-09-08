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
        stopButton.value = moment().format('HH:mm:ss');
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

    let secouds = end.diff(start, 'seconds'),
        minutes = end.diff(start, 'minutes'),
        hours = end.diff(start, 'hours');

    save(start.toDate(), end.toDate(), (hours + ':' + minutes + ':' + secouds), description);
}

function save(start, end, diff, description) {
    let db = firebase.firestore();

    db.collection("times").add({
        difference: diff,
        end: end,
        start: start,
        description: description || ''
    }).then(function(docRef) {
        window.$('.toast-body').text('Zeit wurde erfolgreich eingetragen.');
        window.$('.toast').toast('show');
    }).catch(function(error) {
        window.$('.toast-body').text('Fehler beim eintragen der Zeit: ' + error);
        window.$('.toast').toast('show');
    });
}


export default MainAdmin;
