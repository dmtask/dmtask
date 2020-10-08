import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const Header = (props) => {
  return (
    <React.Fragment>
        <nav className='navbar navbar-expand-lg navbar-light bg-light sticky-top'>
            <a className='navbar-brand' href='/'>DM - Task<span className='optionalTitle'> {props.optionalTitle}</span></a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                {menu(props.isAdmin)}
            </div>
        </nav>
    </React.Fragment>
  );
}

function menu(isAdmin) {
    const user = sessionStorage.getItem('firebase:authUser:' + process.env.REACT_APP_FIREBASE_apiKey + ':[DEFAULT]');

    if (!isAdmin) {
        return (
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link projects' href="https://github.com/dmtask" target="_blank">Projekte</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link contacts' href='mailto:dmtask@gmx.de'>Kontakt</a>
                </li>
            </ul>
        );
    } else if (isAdmin && user !== null) {
        return (
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/admin'>Zeittracking</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/report'>Reports</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/holiday'>Urlaubsverwaltung</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='#' onClick={logout}>Logout</a>
                </li>
            </ul>
        );
    } else {
        return ('');
    }
}

function logout() {
    firebase.auth().signOut().then(function() {
        window.location = window.origin;
      }).catch(function(error) {
    });
}

export default Header;
