import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Actions from '../Actions';
import './Header.css';
import { CATEGORY_TYPE, LOCATION_TYPE } from '../../redux/reducers/common';
import { deleteCategory, deleteLocation, selectItem } from '../../redux/actions';
import EditCategory from '../body/categories/EditCategory';
import EditLocation from '../body/locations/EditLocation';

const NEW = 'NEW';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const MAP = 'MAP';
const CATEGORIES = 'CATEGORIES';
const LOCATIONS = 'LOCATIONS';

const API_KEY = 'AIzaSyDcEbvKQSuPk5nYMH9_psyfb1ExuLwrzOI';

function Header() {

    const selectedType = useSelector(state => state.common.selectedType);
    const selectedItem = useSelector(state => state.common.selectedItem);
    const locations = useSelector(state => state.locations.locations);
    const categories = useSelector(state => state.categories.categories);
    const dispatch = useDispatch();

    const [showCategoryModel, setShowCategoryModel] = useState(false);
    const [showLocationModel, setShowLocationModel] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const title = selectedType === CATEGORY_TYPE ? CATEGORIES : LOCATIONS;

    const getHeaderActions = () => {
        const actionArr = [{ title: NEW, fnc: handleNew }];
        selectedItem && actionArr.push(
            { title: DELETE, fnc: handleDelete },
            { title: EDIT, fnc: handleEdit }
        );
        if (selectedItem && selectedType === LOCATION_TYPE) {
            actionArr.push({ title: MAP, fnc: handleShowMaps })
        }
        return actionArr;
    }

    const handleNew = () => {
        if (selectedType === LOCATION_TYPE && !categories.length) {
            alert('Please create new category before.');
            return;
        }
        setIsNew(true);
        selectedType === CATEGORY_TYPE ?
            setShowCategoryModel(true) :
            setShowLocationModel(true);
    }

    const handleDelete = () => {
        if (selectedType === CATEGORY_TYPE) {
            if (locations.find(location => location.category === selectedItem.name)) {
                alert('One or more locations are associate with this category.');
                return;
            }
            else {
                dispatch(deleteCategory(selectedItem));
            }
        } else {
            dispatch(deleteLocation(selectedItem));
        }
        dispatch(selectItem(null, selectedType));
    }

    const handleEdit = () => {
        setIsNew(false);
        selectedType === CATEGORY_TYPE ?
            setShowCategoryModel(true) :
            setShowLocationModel(true);
    }

    const handleShowMaps = () => {
        setShowMap(true);
    }

    const handleClose = () => {
        setShowMap(false);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Actions actions={getHeaderActions()} />
                    <Typography variant="h6" className="list-title">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <EditCategory
                show={showCategoryModel}
                onHide={(e) => setShowCategoryModel(false)}
                isNew={isNew} />
            <EditLocation
                show={showLocationModel}
                onHide={(e) => setShowLocationModel(false)}
                isNew={isNew} />
            <Modal
                open={showMap}
                onClose={handleClose} >
                <div style={{ height: '500px', width: '500px', position: 'absolute', left: '20px', top: '20px' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: API_KEY }}
                        defaultCenter={{
                            lat: parseFloat(selectedItem && selectedItem.lat),
                            lng: parseFloat(selectedItem && selectedItem.lng)
                        }}
                        defaultZoom={5}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default Header;