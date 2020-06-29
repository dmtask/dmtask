import React from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { AuthContext, useAuth } from "./context/auth";

import './App.css';

function App() {
    const isAuthenticated = useAuth();

    return (
        <AuthContext.Provider value={false}>
            <HashRouter>
                <Route exact path={"/"}>
                    <Home />
                </Route>
                <Route path={"/admin"} render={() => isAuthenticated ? (<Admin />) : (<Redirect to="/login" />)} />
                <Route path={'/login'}>
                    <Login />
                </Route>
            </HashRouter>
        </AuthContext.Provider>
    );
}

export default App;
