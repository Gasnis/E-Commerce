import {
    GET_USER,
    GET_USER_BY_ID,
    LOGOUT,
} from "./actions"


const initialState = {
    profile: {},
    users: [],
    allUsers: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            
            return {
                ...state,
                allUsers: action.payload,
                users: action.payload
            }

        case GET_USER_BY_ID:
            return {
                ...state,
                profile: action.payload
            }

        case LOGOUT:
            return {
                ...state,
                profile: {}
            }
            
        default:
            return state;
    }
}