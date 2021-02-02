import React from 'react';

function MainAdmin() {
    return(
        <main role="main" className="container-fluid mb-4">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <h2>Hallo Admin!</h2>
                </div>
            </div>
            <div className="row mt-4">
                <ul>
                    <li><a href="/#/holiday">Urlaubsverwaltung</a></li>
                    <li><a href="/#/overtime">Überstunden</a></li>
                </ul>
            </div>
        </main>
    );
}

export default MainAdmin;
