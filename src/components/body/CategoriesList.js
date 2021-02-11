import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Alert from '@material-ui/lab/Alert';

import { selectCategory } from '../../redux/actions'

function CategoriesList() {

    const categories = useSelector(state => state.categories.categories);
    const selectedCategory = useSelector(state => state.categories.selectedCategory);
    const dispatch = useDispatch();

    const handleSelectCategory = (category) => {
        dispatch(selectCategory(category));
    }

    return (
        categories.length ?
            <List>
                {
                    categories.map(category =>
                        <ListItem button selected={category == selectedCategory}
                            onClick={(e) => handleSelectCategory(category)}>
                            <ListItemText primary={category} />
                        </ListItem>)
                }
            </List>
            : <Alert severity="info">Category list is empty</Alert>
    )
}

export default CategoriesList;
