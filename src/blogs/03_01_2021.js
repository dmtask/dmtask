import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BestJsBooks = (props) => {
    if (props.preview === 'true') {
        // TODO: Kleiner Preview Text mit Link auf den eigentlichen Blog Beitrag
        return ('');
    } else {
        return (
            <React.Fragment>
                <Header optionalTitle='' />
                <div className="row">
                    <div className="col-12">
                        
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
};

export default BestJsBooks;
