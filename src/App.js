import React from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

import './App.css';

function App() {
  return (
    <HashRouter>
        <Route exact path={"/"}>
            <Home />
        </Route>
        <Route path={"/admin"}>
            <Admin />
        </Route>
    </HashRouter>
  );
}

export default App;
