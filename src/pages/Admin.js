import React from 'react';
import Header from '../components/Header';
import MainAdmin from '../components/MainAdmin';
import Footer from '../components/Footer';

function Admin() {
  return (
    <React.Fragment>
        <Header optionalTitle='Intern' isAdmin={true} />
        <MainAdmin />
        <Footer />
    </React.Fragment>
  );
}

export default Admin;
