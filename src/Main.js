import React from 'react';
import Bild from './bild3.jpg';

require('dotenv').config();

const projects = [{
    name: 'docker-ruby-node',
    description: 'A Dockerfile for ruby 2.6.5 and nodejs 12',
    release: false
},
{
    name: 'multi-release-manager',
    description: 'Multi Versionierungs Tool für Ruby gems',
    release: true
},
{
    name: 'delete-old-logs',
    description: '',
    release: true
},
{
    name: 'ruler',
    description: 'Ein HTML Lineal als App für Mac',
    release: true
}];

function Main() {
    console.log(process.env.REACT_APP_GITHUBTOKEN);

    return (
        <main role="main">
        <div className="row">
            <div className="col-12">
                <img src={Bild} alt="Headerbild" className="img-fluid" />
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
                    {getProjects()}
                </div>
            </div>
        </div>
    </main>
    );
}

function getReleaseFromGithub(project, callback) {
    fetch('https://api.github.com/repos/dmtask/' + project.name + '/releases/latest', {
            headers: {
                authorization: 'token ' + process.env.REACT_APP_GITHUBTOKEN
            }
        }).then((r) => {
            if (r.status === 200) {
                r.json().then((j) => {
                    callback(j);
                });
            } else {
                //console.error(r.url + ' -> Release ' + r.statusText + ' (' + r.status + ')');
                callback('');
            }
        }).catch((error) => {
            console.error(error);
            callback('');
        });
}

function getProjects() {
    let elements = [];

    projects.forEach((project, index) => {
        let githubLink = "https://github.com/dmtask/" + project.name;
        let downloadLink = '';
        if (project.release) {
            getReleaseFromGithub(project, (release) => {
                console.log(release);
                downloadLink = <a href='#' className="btn btn-primary" title="Letztes Release runterladen">Download</a>;
            });
        }

        elements.push(
            <div key={index} className="card mr-4 mb-4">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    {downloadLink}
                    <a href={githubLink} className="btn">Github öffnen</a>
                </div>
            </div>
        );
    });

    return elements;
}

export default Main;