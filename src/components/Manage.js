import React from 'react';

import CategoriesList from './body/CategoriesList';
import Header from './header/Header';

function Manage() {
    return (
        <div className='wrapper'>
            <Header />
            <CategoriesList />
        </div>
    )
}
export default Manage;
