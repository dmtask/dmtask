import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const firebase = require("firebase");
require("firebase/firestore");

function Holiday() {
  return (
    <React.Fragment>
        <Header optionalTitle='ADMIN' isAdmin={true} />
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap mt-4">
                    <div className="col-12">
                        <h2>Urlaubsverwaltung</h2>
                    </div>
            </div>
            <div className="row mt-4">
                <div className="col-3"></div>
                <div className="col-6">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="align-middle">Urlaubstage gesamt</th>
                                <td>
                                    <input type="text" className="form-control" value="30" id="holiday_sum" onChange={calc} />
                                </td>
                            </tr>
                            <tr>
                                <th className="align-middle">Verplant</th>
                                <td>
                                    <input type="text" className="form-control" id="holiday_plan" onChange={calc} />
                                </td>
                            </tr>
                            <tr>
                                <th className="align-middle">Noch offen</th>
                                <td id="holiday_open"></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button onClick={save} className="btn btn-primary">Speichern</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-3"></div>
            </div>
        </main>
        <Footer />
    </React.Fragment>
  );
}

function calc() {
    let holiday_sum = document.getElementById('holiday_sum').value,
        holiday_plan = document.getElementById('holiday_plan').value;

    let sum = parseInt(holiday_sum) - parseInt(holiday_plan);

    document.getElementById('holiday_open').innerText = sum;
}

function save() {
    let db = firebase.firestore();

    // TODO: Wenn schon ein Eintrag vorhanden ist, soll dieser nur aktualisiert werden
    // TODO: Eintrag beim Laden der Seite laden und in die entsprechenden Felder schreiben

    db.collection("holidays").add({
        sum: parseInt(document.getElementById('holiday_sum').value),
        planning: parseInt(document.getElementById('holiday_plan').value),
        open: parseInt(document.getElementById('holiday_open').innerText)
    }).then(() => {
        
    }).catch((error) => {
        
    });
}

export default Holiday;
