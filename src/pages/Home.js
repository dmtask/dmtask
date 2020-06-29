import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

function Home() {
  return (
    <React.Fragment>
        <Header optionalTitle='' />
        <Main />
        <Footer />
    </React.Fragment>
  );
}

export default Home;
