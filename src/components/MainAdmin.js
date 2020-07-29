import React from 'react';

const firebase = require("firebase");
require("firebase/firestore");

function MainAdmin() {
    return(
        <main role="main" className="container-fluid">
            <div className="row flex-xl-nowrap mt-4">
                <div className="col-12">
                    <form>
                        <input type="text" placeholder="Tätigkeit" className="form-control" id="description" />
                    </form>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <table className="table">
                        <thead>
                            
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}


export default MainAdmin;
