import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReportContent from '../components/ReportContent';

function Report() {
  return (
    <React.Fragment>
        <Header optionalTitle='ADMIN' isAdmin={true} />
        <ReportContent />
        <Footer />
    </React.Fragment>
  );
}

export default Report;
