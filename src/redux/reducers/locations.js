
import {
    ADD_LOCATION,
    DELETE_LOCATION,
    EDIT_LOCATION
} from '../actionTypes';

const initialState = {
    locations: []
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case ADD_LOCATION: {
            const newLocation = { ...payload, id: new Date().getTime() }
            const newLocations = [...state.locations, newLocation];
            return {
                ...state,
                locations: newLocations
            }
        }
        case DELETE_LOCATION: {
            const newLocations = state.locations.filter((location) => location.id !== payload.id);
            return {
                ...state,
                locations: newLocations
            }
        }
        case EDIT_LOCATION: {
            const newLocations = state.locations.map((location) => {
                return location.id == payload.oldLocation.id ?
                    {id: new Date().getTime(), ...payload.newLocation} : location
            });
            return {
                ...state,
                locations: newLocations
            }
        }
        default: return state
    }
}
