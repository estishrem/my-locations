import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import Button from '@material-ui/core/Button';

import { deleteCategory } from '../../redux/actions';
import EditCategory from '../body/EditCategory';
import './Header.css';

const NEW = 'NEW';
const DELETE = 'DELETE';
const EDIT = 'EDIT';

function Actions() {

    const [modalShow, setModalShow] = useState(false);
    const [isNew, setIsNew] = useState(true);

    const selectedCategory = useSelector(state => state.categories.selectedCategory);
    const dispatch = useDispatch();

    const prepareActions = () => {
        const actionArr = [{ title: NEW, fnc: handleNew }];
        selectedCategory && actionArr.push(
            { title: DELETE, fnc: handleDelete },
            { title: EDIT, fnc: handleEdit }
        );
        return actionArr;
    }

    const handleDelete = () => {
        dispatch(deleteCategory(selectedCategory));
    }

    const handleNew = () => {
        setIsNew(true);
        setModalShow(true);
    }

    const handleEdit = () => {
        setIsNew(false);
        setModalShow(true);
    }

    return (
        <div>
            {
                prepareActions().map(action => {
                    return (
                        <Button variant="outlined" onClick={action.fnc} >{action.title}</Button>
                    )
                })
            }
            <EditCategory
                show={modalShow}
                onHide={(e) => setModalShow(false)}
                isNew={isNew} />
        </div >
    )
}

export default Actions;