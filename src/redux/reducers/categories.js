
import {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    EDIT_CATEGORY,
    SELECT_CATEGORY
} from '../actionTypes';

const initialState = {
    categories: [],
    selectedCategory: null
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case ADD_CATEGORY: {
            const newCategories = [...state.categories, payload];
            return {
                ...state,
                categories: newCategories,
                selectedCategory: null
            }
        }
        case DELETE_CATEGORY: {
            const newCategories = state.categories.filter((name) => name !== payload);
            return {
                ...state,
                categories: newCategories,
                selectedCategory: null
            }
        }
        case EDIT_CATEGORY: {
            const newCategories = state.categories.map((name) => {
                return name == state.selectedCategory ?
                    (payload ? payload : name) : name
            });
            return {
                ...state,
                categories: newCategories,
                selectedCategory: null
            }
        }
        case SELECT_CATEGORY: {
            return {
                ...state,
                selectedCategory: payload
            }
        }
        default: return state
    }
}
