import axios from "axios";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_USER = "GET_USER";
export const GET_USER_ID = "GET_USER_ID";
export const CREATE_USER = "CREATE_USER";
export const LOGOUT = "LOGOUT";
export const SEARCH_PRODUCT = "SEARCH_PRODUCT";



// -------------------------- GETS --------------------------------------+
export const getProducts = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/products`);
        return dispatch({
            type: GET_PRODUCTS,
            payload: data
        })
    }
}

export const searchProduct = (name) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/products?name=${name}`);
        return dispatch({
            type: SEARCH_PRODUCT,
            payload: data
        })
    }
}

export const getUser = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user`);
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}


export const getUserId = (id) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user/${id}`);
        return dispatch({
            type: GET_USER_ID,
            payload: data
        })
    }
}

// -------------------------- POST --------------------------------------+

export const createUser = (user) => {
    return async () => {
        try {
            const { data } = await axios.post(`/user`, user);
            return data;
        } catch(error) {
            return error;
        }
    }
}

// -------------------------- Update --------------------------------------+

export const updateProduct = (update) => {
    return async () => {
        const { data } = await axios.put(`/products`, update);
        return data;
    }
}

export const deleteProduct = (product) => {
    return async () => {
        const { data } = await axios.put(`/products/delete`, product);
        return data;
    }
}


export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}