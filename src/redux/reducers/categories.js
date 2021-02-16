
import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY
} from '../actionTypes';

const initialState = {
    categories: []
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case ADD_CATEGORY: {
            const id = new Date().getTime();
            const newCategories = [...state.categories, { id: id, name: payload }];
            return {
                ...state,
                categories: newCategories
            }
        }
        case DELETE_CATEGORY: {
            const newCategories = state.categories.filter((item) => item.id !== payload.id);
            return {
                ...state,
                categories: newCategories
            }
        }
        case EDIT_CATEGORY: {
            const newCategories = state.categories.map((item) => {
                return item.id == payload.oldCategory.id ?
                    (payload.newName ? {id: item.id, name: payload.newName}  :{id: item.id, name: item.name}) : {id: item.id, name:item.name}
            });
            return {
                ...state,
                categories: newCategories
            }
        }
        default: return state
    }
}
