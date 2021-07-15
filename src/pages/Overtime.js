import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { ToastContainer, toast } from 'react-toastify';

const firebase = require("firebase");
require("firebase/firestore");

let overtime_doc_ref = null;

class Overtime extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header optionalTitle='Intern' isAdmin={true} />
                <main role="main" className="container-fluid">
                    <div className="row flex-xl-nowrap mt-4">
                        <div className="col-12">
                            <h2>Überstunden</h2>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3"></div>
                        <div className="col-6">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="align-middle">gesamt (Std.)</th>
                                        <td>
                                            <input type="text" className="form-control" id="sum" />
                                        </td>
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

        db.collection('overtime').get().then((docs) => {
            if (docs.docs.length >= 1) {
                overtime_doc_ref = docs.docs[0]; // Es gibt immer nur einen Eintrag, welcher immer aktualisiert wird

                document.getElementById('sum').value = overtime_doc_ref.data().sum;
            }
        });
    }

    save() {
        let db = firebase.firestore();

        if (overtime_doc_ref === null) {
            db.collection("holidays").add({
                sum: document.getElementById('sum').value
            }).then(() => {
                toast.success('Überstunden erfolgreich eingetragen.');
            }).catch((error) => {
                toast.error('Beim eintragen der Überstunden ist ein Fehler aufgetreten: ' + error);
            });
        } else {
            overtime_doc_ref.ref.update({
                sum: document.getElementById('sum').value
            }).then(function() {
                toast.success('Überstunden erfolgreich aktualisiert.');
            }).catch(function(error) {
                toast.error('Beim aktualisieren der Überstunden ist ein Fehler aufgetreten: ' + error);
            });
        }
    }
}

export default Overtime;
