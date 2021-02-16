import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { addLocation, editLocation, selectItem } from '../../../redux/actions';
import { LOCATION_TYPE } from '../../../redux/reducers/common';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

function EditLocation(props) {

    const { isNew, onHide, show } = { ...props }

    const locations = useSelector(state => state.locations.locations);
    const categories = useSelector(state => state.categories.categories);
    const selectedLocation = useSelector(state => state.common.selectedItem);
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(null);
    const [newAddress, setNewAddress] = useState(null);
    const [newLat, setNewLat] = useState(null);
    const [newLng, setNewLng] = useState(null);
    const [newCategory, setNewCategory] = useState(null);
    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [errorLat, setErrorLat] = useState('');
    const [errorLng, setErrorLng] = useState('');
    const [errorCategory, setErrorCategory] = useState('');

    const classes = useStyles();
    const dialogTitle = isNew ? 'Add Location' : 'Edit Location';
    const defaultValue = isNew ? null : selectedLocation;

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const handleAddressChange = (e) => {
        setNewAddress(e.target.value)
    }

    const handleLatChange = (e) => {
        setNewLat(e.target.value)
    }
    const handleLngChange = (e) => {
        setNewLng(e.target.value)
    }
    const handleCategoryChange = (event) => {
        setNewCategory(event.target.value);
    };

    const checkIfExist = () => {
        var exist = false;
        if (locations.find(location => location.name === newName && location !== selectedLocation)) {
            exist = true;
        }
        return exist
    }

    const closeDialog = () => {
        setNewName(null);
        setNewAddress(null);
        setNewLat(null);
        setNewLng(null);
        setNewCategory(null);
        setErrorName('');
        setErrorAddress('');
        setErrorLat('');
        setErrorLng('');
        setErrorCategory('');
        onHide();
    }

    const checkNameField = () => {
        var valid = false;
        if (!newName && isNew || newName === '' && !isNew) {
            setErrorName('Please fill location name.');
        } else if (checkIfExist()) {
            setErrorName('Location name already exist.');
        } else {
            setErrorName('');
            valid = true;
        }
        return valid;
    }

    const checkAddressField = () => {
        var valid = false;
        if (!newAddress && isNew || newAddress === '' && !isNew) {
            setErrorAddress('Please fill location address.');
        } else {
            setErrorAddress('');
            valid = true;
        }
        return valid;
    }

    const checkLatField = () => {
        var valid = false;
        if (!newLat && isNew || newLat === '' && !isNew) {
            setErrorLat('Please fill location lat.');
        } else if (newLat > 90 || newLat < -90) {
            setErrorLat('Please fill lat between -90 to 90')
        } else {
            setErrorLat('');
            valid = true;
        }
        return valid;
    }

    const checkLngField = () => {
        var valid = false;
        if (!newLng && isNew || newLng === '' && !isNew) {
            setErrorLng('Please fill location lng.');
        } else if (newLng > 180 || newLng < -180) {
            setErrorLng('Please fill lng between -180 to 180')
        } else {
            setErrorLng('');
            valid = true;
        }
        return valid;
    }

    const checkCategoryField = () => {
        var valid = false;
        if (!newCategory && isNew) {
            setErrorCategory('Please select a category.');
        } else {
            setErrorCategory('');
            valid = true;
        }
        return valid;
    }

    const getNewLocationObj = () => {
        const newLocationObj = {
            name: newName ? newName : selectedLocation.name,
            address: newAddress ? newAddress : selectedLocation.address,
            lat: newLat ? newLat : selectedLocation.lat,
            lng: newLng ? newLng : selectedLocation.lng,
            category: newCategory ? newCategory : selectedLocation.category
        }
        return newLocationObj;
    }

    const handleSave = () => {
        var valid = true;
        !checkNameField() && (valid = false);
        !checkAddressField() && (valid = false);
        !checkLatField() && (valid = false);
        !checkLngField() && (valid = false);
        !checkCategoryField() && (valid = false);
        if (valid) {
            isNew ?
                dispatch(addLocation(getNewLocationObj())) :
                dispatch(editLocation(selectedLocation, getNewLocationObj()));
            dispatch(selectItem(null, LOCATION_TYPE));
            closeDialog();
        }
    }

    const handleCancle = () => {
        closeDialog();
    }

    return (
        <Dialog open={show} onClose={closeDialog} maxWidth="xs" fullWidth={true} >
            <DialogTitle> {dialogTitle}</DialogTitle>
            <DialogContent>
                <TextField fullWidth label="Name" defaultValue={defaultValue && defaultValue.name}
                    required error={!!errorName} helperText={errorName || ''} onChange={handleNameChange} />
                <TextField fullWidth label="Address" defaultValue={defaultValue && defaultValue.address}
                    required error={!!errorAddress} helperText={errorAddress || ''} onChange={handleAddressChange} />
                <TextField fullWidth label="Lat" defaultValue={defaultValue && defaultValue.lat}
                    required type='number' error={!!errorLat} helperText={errorLat || ''} onChange={handleLatChange} />
                <TextField fullWidth label="Lng" defaultValue={defaultValue && defaultValue.lng}
                    required type='number' error={!!errorLng} helperText={errorLng || ''} onChange={handleLngChange} />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        error={!!errorCategory} helperText={errorCategory || ''}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={isNew ? newCategory : defaultValue && defaultValue.category}
                        onChange={handleCategoryChange}
                    >
                        {
                            categories.map(category => {
                                return <MenuItem value={category.name}>{category.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSave}>SAVE</Button>
                <Button variant="contained" color="secondary" onClick={handleCancle}>CANCLE</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditLocation;
