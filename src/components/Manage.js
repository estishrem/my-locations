import React from 'react';

import ShowList from './body/ShowList';
import Footer from './footer/Footer';
import Header from './header/Header';

function Manage() {
    return (
        <div className='wrapper'>
            <Header />
            <ShowList/>
            <Footer/>
        </div>
    )
}
export default Manage;
