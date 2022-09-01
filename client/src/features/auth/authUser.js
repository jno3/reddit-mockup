import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/user/login";

const authUser = async() => {
    await axios.get(API_URL);
}

export const tokenLogout = (data) => {
    const response = data.response.data;
    if(!response.success && response.type === 'notoken'){
        alert('you must login in order to perform this action');
    }
    if(!response.success && response.type === 'token'){
        localStorage.removeItem('user')
        alert('your session token has expired');
    }
    document.location.href="/";
}

export default authUser;