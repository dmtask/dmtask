import React, { useCallback } from 'react';
import Bild from './bild3.jpg';

const projectNames = ['docker-ruby-node','multi-release-manager','delete-old-logs','ruler'];
const projectReleases = [];

function Main() {
    getReleaseFromGithub((releases) => {
        console.log(releases);
    });

    return (
        <main role="main">
        <div className="row">
            <div className="col-12">
                <img src={Bild} alt="" className="img-fluid" />
            </div>
        </div>
        <div className="container">
        <div className="row mt-4">
            <div className="col-12">
                <h2>Projekte</h2>
            </div>
        </div>
            <div className="row mt-2 mb-4" id="projects">
                <div className="col-12">
                    {getProjectName()}
                </div>
            </div>
        </div>
    </main>
    );
}

function getReleaseFromGithub(callback) {
    projectNames.forEach((projectName, index) => {
        fetch('https://api.github.com/repos/dmtask/' + projectName + '/releases/latest', {
            headers: {
                authorization: 'token 19b3219402c21e5b3ee75693a279e40e93e58316'
            }
        }).then((r) => {
            if (r.status === 200) {
                r.json().then((j) => {
                    projectReleases.push(j);
                });

                if (index === projectNames.length - 1) {
                    callback(projectReleases);
                }
            } else {
                //console.error(r.url + ' -> Release ' + r.statusText + ' (' + r.status + ')');
            }
        }).catch((error) => {
            console.error(error);
        });
    });
}

function getProjectDescriptionByName(projectName, callback) {
    fetch('https://api.github.com/repos/dmtask/' + projectName, {
        headers: {
            authorization: 'token 19b3219402c21e5b3ee75693a279e40e93e58316'
        }
    }).then((r) => {
        r.json().then((j) => {
            console.log(j);
            console.log(j.description);

            callback(j.description);
        });
    });
}

function getProjectName() {
    let elements = [];

    projectNames.forEach((projectName, index) => {
        elements.push(
            <div key={index} className="card mr-4 mb-4">
                <div className="card-body">
                    <h5 className="card-title">{projectName}</h5>
                    <p className="card-text">{getProjectDescriptionByName(projectName, (description) => { })}</p>
                    <a href="#" className="btn btn-primary"></a>
                </div>
            </div>
        );
    });

    return elements;
}

export default Main;