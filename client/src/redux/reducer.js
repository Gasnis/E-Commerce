import {
    GET_USER,
    GET_PRODUCTS,
    GET_USER_ID,
    LOGOUT,
    SEARCH_PRODUCT
} from "./actions"


const initialState = {
    products: [],
    allProducts: [],
    users: [],
    allUsers: [],
    profile: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            
            return {
                ...state,
                allUsers: action.payload,
                users: action.payload
            }

        case GET_USER_ID:
            console.log(action.payload)
            return {
                ...state,
                profile: action.payload
            }

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                allProducts: action.payload
            }
        case SEARCH_PRODUCT:
            return {
                ...state,
                products: action.payload,
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