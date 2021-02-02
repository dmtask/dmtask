import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Holiday from './pages/Holiday';
import Overtime from './pages/Overtime';
import Login from './pages/Login';
import Imprint from './pages/Imprint';
import firebase from "firebase/app";
import "firebase/auth";

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
    let firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_apiKey,
        authDomain: process.env.REACT_APP_FIREBASE_authDomain,
        databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
        projectId: process.env.REACT_APP_FIREBASE_projectId,
        storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
        messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
        appId: process.env.REACT_APP_FIREBASE_appId,
        measurementId: process.env.REACT_APP_FIREBASE_measurementId
    };
    firebase.initializeApp(firebaseConfig);

    const user = sessionStorage.getItem('firebase:authUser:' + process.env.REACT_APP_FIREBASE_apiKey + ':[DEFAULT]');

    return (
        <HashRouter>
            <Route exact path={"/"}>
                <Home />
            </Route>
            <Route path={"/admin"} render={() => user !== null ? (<Admin />) : (<Redirect to="/login" />)} />
            <Route path={"/holiday"} render={() => user !== null ? (<Holiday />) : (<Redirect to="/login" />)} />
            <Route path={"/overtime"} render={() => user !== null ? (<Overtime />) : (<Redirect to="/login" />)} />
            <Route path={'/login'}>
                <Login />
            </Route>
            <Route path={'/imprint'}>
                <Imprint />
            </Route>
        </HashRouter>
    );
}

export default App;
