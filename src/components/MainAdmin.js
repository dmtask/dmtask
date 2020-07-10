import React from 'react';

const firebase = require("firebase");
require("firebase/firestore");

let interval = null,
    start = null;

function MainAdmin() {
    return(
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <form>
                        <input type="text" placeholder="Tätigkeit" className="form-control" id="description" />
                        <input type="submit" value="Start Timer" onClick={startTimer} className="btn btn-primary startButton" />
                        <input type="submit" value="Stop Timer" onClick={stopTimer} className="btn btn-danger stopButton hidden" />
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Startzeit</th>
                                <th>Endzeit</th>
                                <th>Differenz</th>
                                <th>Tätigkeit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getTimers}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

function startTimer() {
    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0];

    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');

    start = new Date();

    interval = setInterval(function() {
        let date = new Date(),
            hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

        stopButton.value = (hours + ':' + minutes + ':' + seconds);
    }, 1000);
}

function stopTimer() {
    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0],
        description = document.getElementById('description').value,
        end = new Date();

    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');

    clearInterval(interval);

    let seconds = Math.floor((end.getTime() - start.getTime()) / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60);

    save(start, end, ((hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)), description);
}

function save(start, end, diff, description) {
    var db = firebase.firestore();

    db.collection("times").add({
        differenz: diff,
        end: end,
        start: start,
        task: description || ''
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

function getTimers() {
    return '';
}

export default MainAdmin;
