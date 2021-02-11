import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    SELECT_CATEGORY,
} from './actionTypes';

export const addCategory = (name) => {
    return {
        type: ADD_CATEGORY,
        payload: name
    }
}

export const deleteCategory = (name) => {
    return {
        type: DELETE_CATEGORY,
        payload: name
    }
}

export const editCategory = (newName) => {
    return {
        type: EDIT_CATEGORY,
        payload: newName
    }
}

export const selectCategory = (name) => {
    return {
        type: SELECT_CATEGORY,
        payload: name
    }
}
