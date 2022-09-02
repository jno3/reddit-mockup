import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/user/auth";

const authUser = async () => {
    try {
        const result = await axios.get(API_URL);
        return result
    }
    catch (err) {
        return err
    }
}

export const tokenLogout = (data) => {

    const response = data.response.data;
    if (!response.success && response.type === 'timeout') {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            alert('your session token has expired');
        }
    }
    if (!response.success && response.type === 'notoken') {
        alert('you must login in order to perform this action');
    }
    if (!response.success && response.type === 'token') {
        localStorage.removeItem('user')
        alert('your session token has expired');
    }
    // document.location.href = "/";
}

export default authUser;