import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/user/logout";

const logout = async() => {
    await axios.get(API_URL);
}

export default logout;