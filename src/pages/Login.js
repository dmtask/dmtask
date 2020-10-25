import React from "react";
import {Redirect} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import firebase from "firebase/app";
import "firebase/auth";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        console.log(process);

        event.preventDefault();

        let password = this.state.value;

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
            firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_LOGINEMAIL, password).then(function() {
                window.location.reload();
            }).catch(function(error) {
                document.querySelector('.errorsLogin > div').innerHTML = error.code + ': ' + error.message;
                document.getElementsByClassName('errorsLogin')[0].style.display = 'block';
            });
        });
    }

    render() {
        const user = sessionStorage.getItem('firebase:authUser:' + process.env.REACT_APP_FIREBASE_apiKey + ':[DEFAULT]');

        if (user !== null) {
            return (<Redirect to="/admin" />);
        } else {
            return (
                <React.Fragment>
                    <Header optionalTitle='ADMIN' isAdmin={true} />
                    <main role="main" className="container-fluid">
                        <div className="row flex-xl-nowrap mt-4 errorsLogin">
                            <div className="alert alert-danger" role="alert"></div>
                        </div>
                        <div className="row flex-xl-nowrap mt-4 mb-4">
                            <div className="col-12 text-center">
                                <form action="/#/login" onSubmit={this.handleSubmit}>
                                    <input type="password" value={this.state.value} onChange={this.handleChange} placeholder="Passwort" className="form-control" />
                                    <input type="submit" value="Login" className="btn btn-primary" />
                                </form>
                            </div>
                        </div>
                    </main>
                    <Footer />
                </React.Fragment>
            );
        }
    }
}

export default Login;
