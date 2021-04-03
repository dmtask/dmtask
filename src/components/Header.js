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
                <ul className="navbar-nav ml-md-auto">
                    <li className='nav-item'>
                        <a className='nav-link' href="https://www.instagram.com/danielmertgen/" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="navbar-nav-svg" viewBox="0 0 169.063 169.063" role="img" focusable="false">
                                <title>Instagram öffnen</title>
                                <g>
                                    <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
                                        c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
                                        c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
                                        c17.455,0,31.656,14.201,31.656,31.655V122.407z"/>
                                    <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
                                        C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
                                        c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z"/>
                                    <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
                                        c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
                                        C135.661,29.421,132.821,28.251,129.921,28.251z"/>
                                </g>
                            </svg>
                        </a>
                    </li>
                </ul>
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
                    <a className='nav-link' href="https://github.com/dmtask" target="_blank" rel="noopener noreferrer">Projekte</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/imprint'>Impressum</a>
                </li>
            </ul>
        );
    } else if (isAdmin && user !== null) {
        return (
            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/admin'>Start</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/holiday'>Urlaubsverwaltung</a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/#/overtime'>Überstunden</a>
                </li>
                <li className='nav-item'>
                    <button className='nav-link' onClick={logout}>Logout</button>
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
