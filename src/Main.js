import React from 'react';
import Bild from './bild3.jpg';

function Main() {
    return (
        <main role="main">
        <div className="row">
            <div className="col-12">
                <img src={Bild} alt="" className="img-fluid" />
            </div>
        </div>
        <div className="container">
            <div className="row" id="projects">
                <div className="col-6">
                    <h2>Projekte</h2>
                    Alle öffentichen Projekte befinden sich in meinem Github Account. Einige private Projekte liste ich hier auf:
                    <ul>
                        <li>
                            <b>MRM (Multi-Release-Manager)</b><br />
                            Multi Versionierungs Tool für Ruby gems<br />
                            <a href="assets/downloads/multi-release-manager/1.2.0.zip">Aktuelle Version</a>
                        </li>
                        <li>
                            <b>Delete old Logs</b><br />
                            Bash Script zum löschen alter Log Dateien<br />
                            <a href="assets/downloads/delete-old-logs/1.0.0.zip">Aktuelle Version</a>
                        </li>
                    </ul>
                </div>
                <div className="col-6">
                    <a href="https://github.com/dmtask" target="_blank"><button type="button" className="btn btn-outline-dark">Github</button></a>
                </div>
            </div>
        </div>
    </main>
    );
}

export default Main;