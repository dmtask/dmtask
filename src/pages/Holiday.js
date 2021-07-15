import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { ToastContainer, toast } from 'react-toastify';

const firebase = require("firebase");
require("firebase/firestore");

let holiday_doc_ref = null;

class Holiday extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header optionalTitle='Intern' isAdmin={true} />
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
                                            <input type="text" className="form-control" value="30" id="holiday_sum" onChange={this.calc} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="align-middle">Verplant <br />(1 Weiberdonnerstag, 1 Rosenmontag, 0,5 Weihnachten, 0,5 Silvester)</th>
                                        <td>
                                            <input type="text" className="form-control" id="holiday_plan" onChange={this.calc} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="align-middle">Noch offen</th>
                                        <td id="holiday_open"></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <button onClick={this.save} className="btn btn-primary">Speichern</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-3"></div>
                    </div>
                    <ToastContainer />
                </main>
                <Footer />
            </React.Fragment>
          );
    }

    componentDidMount() {
        let db = firebase.firestore();

        db.collection('holidays').get().then((docs) => {
            if (docs.docs.length >= 1) {
                holiday_doc_ref = docs.docs[0]; // Es gibt immer nur einen Eintrag, welcher immer aktualisiert wird

                document.getElementById('holiday_sum').value = holiday_doc_ref.data().sum;
                document.getElementById('holiday_plan').value = holiday_doc_ref.data().planning;
                document.getElementById('holiday_open').innerText = holiday_doc_ref.data().open;
            }
        });
    }

    calc() {
        let holiday_sum = document.getElementById('holiday_sum').value,
            holiday_plan = document.getElementById('holiday_plan').value;
    
        let sum = parseInt(holiday_sum) - parseInt(holiday_plan);
    
        document.getElementById('holiday_open').innerText = sum;
    }

    save() {
        let db = firebase.firestore();

        if (holiday_doc_ref === null) {
            db.collection("holidays").add({
                sum: parseInt(document.getElementById('holiday_sum').value),
                planning: parseInt(document.getElementById('holiday_plan').value),
                open: parseInt(document.getElementById('holiday_open').innerText)
            }).then(() => {
                toast.success('Urlaub erfolgreich eingetragen.');
            }).catch((error) => {
                toast.error('Beim eintragen des Urlaubs ist ein Fehler aufgetreten: ' + error);
            });
        } else {
            holiday_doc_ref.ref.update({
                planning: parseInt(document.getElementById('holiday_plan').value),
                open: parseInt(document.getElementById('holiday_open').innerText)
            }).then(function() {
                toast.success('Urlaub erfolgreich aktualisiert.');
            }).catch(function(error) {
                toast.error('Beim aktualisieren des Urlaubs ist ein Fehler aufgetreten: ' + error);
            });
        }
    }
}

export default Holiday;
