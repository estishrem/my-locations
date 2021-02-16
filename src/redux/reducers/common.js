
import { SELECT_ITEM } from '../actionTypes';

export const CATEGORY_TYPE = 'CATEGORY_TYPE';
export const LOCATION_TYPE = 'LOCATION_TYPE';

const initialState = {
    selectedItem: null,
    selectedType: CATEGORY_TYPE
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case SELECT_ITEM: {
            return {
                ...state,
                selectedItem: payload.item,
                selectedType: payload.type
            }
        }
        default: return state
    }
}
