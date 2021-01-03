import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import BestJsBooks from '../blogs/03_01_2021';

function Blog() {
  return (
    <React.Fragment>
        <Header optionalTitle='' />
        <div className="row">
            <div className="col-6">
                <BestJsBooks preview="true" />
            </div>
        </div>
        <Footer />
    </React.Fragment>
  );
}

export default Blog;
