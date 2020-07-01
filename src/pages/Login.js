import React from "react";
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
        let password = this.state.value;

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
            firebase.auth().signInWithEmailAndPassword(process.env.REACT_APP_LOGINEMAIL, password).catch(function(error) {
                console.log(error);
            });
        });

        if (firebase.auth().currentUser) {
            window.setTimeout(function() {
                window.location = window.origin + '/#/admin';
            }, 2000);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="password" value={this.state.value} onChange={this.handleChange} placeholder="Passwort" />
                <input type="submit" value="Login" />
            </form>
        );
    }
}

export default Login;