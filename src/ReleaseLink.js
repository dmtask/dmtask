import React, { Component } from 'react';

class ReleaseLink extends Component {
    href = ''

    constructor(props) {
        super(props);

        console.log('constructor');

        this.project = props.project;
    }

    componentWillMount() {
        console.log('componentWillMount');

        this.getRelease(this.project, (href) => {
            console.log('hier rein');
            this.href = href;
        });
    }

    getRelease(project, callback) {
        if (project.release) {
            fetch('https://api.github.com/repos/dmtask/' + project.name + '/releases/latest', {
                headers: {
                    authorization: 'token ' + process.env.REACT_APP_GITHUBTOKEN
                }
            }).then((r) => {
                if (r.status === 200) {
                    r.json().then((j) => {
                        callback(<a href='#' title=''>Release Download</a>);
                    });
                } else {
                    //console.error(r.url + ' -> Release ' + r.statusText + ' (' + r.status + ')');
                    callback('');
                }
            }).catch((error) => {
                console.error(error);
                callback('');
            });
        } else {
            callback('');
        }
    }

    render() {
        console.log('render');
        return(<div>{this.href}</div>);
    }
}

export default ReleaseLink;