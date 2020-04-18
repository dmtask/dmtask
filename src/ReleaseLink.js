import React, { Component } from 'react';

class ReleaseLink extends Component {
    href = ''

    constructor(props) {
        super(props);

        this.project = props.project;
    }

    componentWillMount() {
        console.log('componentWillMount');

        this.getRelease(this.project, (href) => {
            this.href = href;
        });
    }

    getRelease(project, callback) {
        if (project.release) {
            let href = 'https://github.com/dmtask/' + project.name + '/releases',
                downloadHref = 'downloads/' + project.name + '.zip';

            if (project.private) {
                callback(<a href={downloadHref} className="btn btn-primary">aktuelle Version runterladen</a>);
            } else {
                callback(<a href={href} className="btn btn-primary" target='_blank'>Downloads anzeigen</a>);
            }
        } else {
            callback('');
        }
    }

    render() {
        return(<div>{this.href}</div>);
    }
}

export default ReleaseLink;