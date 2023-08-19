import axios from "axios";
const host = process.env.REACT_APP_BACKEND_URL;


export const userRegistration = async (datas) => {
    try {

        const { data } = await axios.post(`${host}/user_registration`, datas);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const userLogin = async (datas) => {
    // console.log(datas)
    try {
        const { data } = await axios.post(`${host}/user_login`, datas);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const getLoggedUser = async (id) => {
    try {
        const { data } = await axios.get(`${host}/get_logged_user/${id}`);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const updatedUser = async (id, datas) => {
    try {
        const { data } = await axios.put(`${host}/update_user/${id}`,{datas});
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};

export const deleteUser = async (id) => {
    try {
        const { data } = await axios.delete(`${host}/delete_user/${id}`);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
};
