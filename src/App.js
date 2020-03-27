import React from 'react';
import './App.css';

function App() {
  return (
    <header className="App-header">
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
            <a class="navbar-brand" href="http://dm-task.de">DM - Task</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link projects" href="#projects">Projekte</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link contacts" href="mailto:dmtask@gmx.de">Kontakt</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  );
}

export default App;
