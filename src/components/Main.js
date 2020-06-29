import React from 'react';
import Bild from '../bild3.jpg';

//require('dotenv').config();

const projects = [{
    name: 'docker-ruby-node',
    description: 'A Dockerfile for ruby 2.6.5 and nodejs 12',
    release: false,
    private: false
},
{
    name: 'multi-release-manager',
    description: 'Multi Versionierungs Tool für Ruby gems',
    release: true,
    private: true
},
{
    name: 'delete-old-logs',
    description: '',
    release: true,
    private: false
},
{
    name: 'ruler',
    description: 'Ein HTML Lineal als App für Mac',
    release: true,
    private: false
}];

function Main() {
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
                        <h2>Über mich</h2>
                    </div>
                </div>
                <div className="row mt-2 mb-4" id="about">
                    <div className="col-12">
                        - Folgt -
                    </div>
                </div>
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

/**
 * Geht alle oben definierten Projekte durch und baut entsprechendes HTML zusammen
 */
function getProjects() {
    let elements = [];

    projects.forEach((project, index) => {
        let githubLink = '';

        // Alle nicht privaten Projekte bekommen einen Github öffnen Link
        if (!project.private) {
            let href = "https://github.com/dmtask/" + project.name;
            githubLink = <a href={href} className="btn" target='_blank' rel="noopener noreferrer">Github öffnen</a>
        }

        elements.push(
            <div key={index} className="card mr-4 mb-4">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    {getReleaseLink(project)}
                    {githubLink}
                </div>
            </div>
        );
    });

    return elements;
}

/**
 * Baut den Release Link zusammen. Bei privaten Projekten gibt es einen direkt Download, bei öffentlichen einen Link zur Github Releases Seite
 * @param project Das aktuelle Projekt
 */
function getReleaseLink(project) {
    let aTag = '';

    if (project.release) {
        let href = 'https://github.com/dmtask/' + project.name + '/releases',
            downloadHref = 'downloads/' + project.name + '.zip';

        if (project.private) {
            aTag = <a href={downloadHref} className="btn btn-primary">aktuelle Version runterladen</a>;
        } else {
            aTag = <a href={href} className="btn btn-primary" target='_blank' rel="noopener noreferrer">Downloads anzeigen</a>;
        }
    }

    return aTag;
}

export default Main;