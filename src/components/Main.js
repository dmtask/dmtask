import React from 'react';
import Bild from '../bild3.jpg';

function Main() {
    return (
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap">
                <div className="col-12 pl-0 pr-0 mb-4">
                    <img src={Bild} alt="Headerbild" className="img-fluid" />
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Willkommen Welt!</h2>
                    Diese Webseite enthält aktuell keinen öffentlichen Inhalt.
                    Meine Projekte findet Ihr auf <a href="https://github.com/dmtask" target="_blank" rel="noopener noreferrer">github</a>.
                </div>
            </div>
            <div className="row mt-2 mb-4">
                <div className="col-6">
                </div>
            </div>
        </main>
    );
}

export default Main;