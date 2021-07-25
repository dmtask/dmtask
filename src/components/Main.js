import React from 'react';
import Bild from '../bild3.jpg';

class Main extends React.Component {
    render () {
        return (
            <main role="main" className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="col-12 pl-0 pr-0 mb-4">
                        <img src={Bild} alt="Headerbild" className="img-fluid" />
                        <div className="scroll-indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrowhead-down"><rect width="24" height="24" opacity="0"/><path d="M17.37 12.39L12 16.71l-5.36-4.48a1 1 0 1 0-1.28 1.54l6 5a1 1 0 0 0 1.27 0l6-4.83a1 1 0 0 0 .15-1.41 1 1 0 0 0-1.41-.14z"/><path d="M11.36 11.77a1 1 0 0 0 1.27 0l6-4.83a1 1 0 0 0 .15-1.41 1 1 0 0 0-1.41-.15L12 9.71 6.64 5.23a1 1 0 0 0-1.28 1.54z"/></g></g></svg>
                        </div>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h2>Willkommen Welt!</h2>
                        Diese Webseite enthält aktuell keinen öffentlichen Inhalt.
                        Meine Projekte findet Ihr auf <a href="https://github.com/dmtask" target="_blank" rel="noopener noreferrer">github</a>.
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        this.setScrollIndicator();

        window.addEventListener('resize', () => {
            this.setScrollIndicator();
        });
    }

    setScrollIndicator() {
        let innerHeight = window.innerHeight;

        document.querySelector('.scroll-indicator').style.top = (innerHeight - 120) + 'px';
    }
}

export default Main;