import axios from 'axios';
import API_URL from '../../globalvar';

export const authUser = async () => {
    try {
        const result = await axios.get(`${API_URL}/user/auth`);
        return result.data;
    }
    catch (err) {
        return err.response.data;
    }
}

export const tokenLogout = (data) => {
    const response = data;
    if (!response.success && response.type === 'timeout') {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            alert('your session token has expired');
            return false;
        }
    }
    if (!response.success && response.type === 'notoken') {
        alert('you must login in order to perform this action');
        return false;
    }
    if (!response.success && response.type === 'token') {
        localStorage.removeItem('user')
        alert('your session token has expired');
        return false;
    }
    return true;
    // document.location.href = "/";
}