import axios from "axios";

export const GET_USER = "GET_USER";



export const getUser = () => {
    return async (dispatch) => {
        const { data } = await axios.get(`/user`);
        return dispatch({
            type: GET_USER,
            payload: data
        })
    }
}



