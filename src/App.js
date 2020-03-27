import React from 'react';
import './App.css';

function App() {
  return (
    <header className='App-header'>
      <nav className='navbar navbar-expand-lg fixed-top navbar-light bg-light'>
            <a className='navbar-brand' href='http://dm-task.de'>DM - Task</a>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a className='nav-link projects' href='#projects'>Projekte</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link contacts' href='mailto:dmtask@gmx.de'>Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  );
}

export default App;
