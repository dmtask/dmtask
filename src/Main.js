import React from 'react';
import Bild from './bild3.jpg';

import ReleaseLink from './ReleaseLink';

require('dotenv').config();

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

function getProjects() {
    let elements = [];

    projects.forEach((project, index) => {
        let githubLink = '';

        if (!project.private) {
            let href = "https://github.com/dmtask/" + project.name;
            githubLink = <a href={href} className="btn" target='_blank'>Github öffnen</a>
        }

        elements.push(
            <div key={index} className="card mr-4 mb-4">
                <div className="card-body">
                    <h5 className="card-title">{project.name}</h5>
                    <p className="card-text">{project.description}</p>
                    <ReleaseLink project={project} />
                    {githubLink}
                </div>
            </div>
        );
    });

    return elements;
}

export default Main;