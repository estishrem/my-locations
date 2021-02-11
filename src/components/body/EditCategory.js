import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { addCategory, editCategory } from '../../redux/actions';

function EditCategory(props) {

    const { isNew, onHide, show } = { ...props }

    const categories = useSelector(state => state.categories.categories);
    const selectedCategory = useSelector(state => state.categories.selectedCategory);
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(null);
    const [errorMassage, setErrorMassage] = useState('');

    const dialogTitle = isNew ? 'Add Category Name' : 'Edit Category Name';
    const defaultValue = isNew ? null : selectedCategory;

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }

    const checkIfExist = () => {
        let exist = false;
        if (categories.find(category => category === newName && category !== selectedCategory)) {
            exist = true;
        }
        return exist
    }

    const closeDialog = () => {
        setNewName(null);
        setErrorMassage('');
        onHide();
    }

    const handleSave = () => {
        if (!newName && isNew || newName === '' && !isNew) {
            setErrorMassage('Please fill category name.');
        } else if (checkIfExist()) {
            setErrorMassage('Category name already exist.');
        } else {
            const action = isNew ? addCategory : editCategory
            dispatch(action(newName))
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
                <TextField fullWidth label="Category Name" defaultValue={defaultValue}
                    required error={!!errorMassage} helperText={errorMassage || ''} onChange={handleNameChange} />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                <Button variant="contained" color="secondary" onClick={handleCancle}>Cancle</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditCategory;
