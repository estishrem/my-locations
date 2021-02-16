import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    ADD_LOCATION,
    DELETE_LOCATION,
    EDIT_LOCATION,
    SELECT_ITEM
} from './actionTypes';

export const addCategory = (name) => {
    return {
        type: ADD_CATEGORY,
        payload: name
    }
}

export const deleteCategory = (item) => {
    return {
        type: DELETE_CATEGORY,
        payload: item
    }
}

export const editCategory = (oldCategory, newName) => {
    return {
        type: EDIT_CATEGORY,
        payload: {oldCategory, newName}
    }
}

export const addLocation = (location) => {
    return {
        type: ADD_LOCATION,
        payload: location
    }
}

export const deleteLocation = (location) => {
    return {
        type: DELETE_LOCATION,
        payload: location
    }
}

export const editLocation = (oldLocation, newLocation) => {
    return {
        type: EDIT_LOCATION,
        payload: {oldLocation, newLocation}
    }
}

export const selectItem = (item, type) => {
    return {
        type: SELECT_ITEM,
        payload: {
            item,
            type
        }
    }
}
