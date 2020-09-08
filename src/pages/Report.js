import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Report() {
  return (
    <React.Fragment>
        <Header optionalTitle='ADMIN' isAdmin={true} />
        Alle Zeiten im Kalender oder als Tabelle anzeigen....
        <Footer />
    </React.Fragment>
  );
}

export default Report;
