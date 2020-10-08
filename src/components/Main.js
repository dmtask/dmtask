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
        </main>
    );
}

export default Main;