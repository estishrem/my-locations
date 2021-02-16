import React from 'react';
import { useDispatch } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Actions from '../Actions';
import { selectItem } from '../../redux/actions';
import { CATEGORY_TYPE, LOCATION_TYPE } from '../../redux/reducers/common';
import './Footer.css';

const CATEGORIES = 'CATEGORIES';
const LOCATIONS = 'LOCATION';

function Footer() {

    const dispatch = useDispatch();

    const getFooterActions = () => {
        const actionArr = [
            {
                title: CATEGORIES,
                fnc: handleShowCategories
            },
            {
                title: LOCATIONS,
                fnc: handleShowLocations
            }
        ];
        return actionArr;
    }

    const handleShowCategories = () => {
        dispatch(selectItem(null, CATEGORY_TYPE));
    }

    const handleShowLocations = () => {
        dispatch(selectItem(null, LOCATION_TYPE));
    }

    return (
        <AppBar position="static" className='footer'>
            <Toolbar>
                <Actions actions={getFooterActions()}/>
            </Toolbar>
        </AppBar>
    )
}

export default Footer;