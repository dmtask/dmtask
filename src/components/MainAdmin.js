import React from 'react';

let interval = null;
let start = null;

function MainAdmin() {
    return(
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <form>
                        <input type="text" placeholder="Tätigkeit" className="form-control" />
                        <input type="submit" value="Start Timer" onClick={startTimer} className="btn btn-primary startButton" />
                        <input type="submit" value="Stop Timer" onClick={stopTimer} className="btn btn-danger stopButton hidden" />
                    </form>
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
        let date = new Date();
        stopButton.value = (date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    }, 1000);
}

function stopTimer() {
    let stopButton = document.getElementsByClassName('stopButton')[0],
        startButton = document.getElementsByClassName('startButton')[0],
        end = new Date();

    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');

    clearInterval(interval);

    console.log('start: ' + start + ' Ende: ' + end + ' Differenz: ' + (end.getMilliseconds() - start.getMilliseconds()));
}

export default MainAdmin;
