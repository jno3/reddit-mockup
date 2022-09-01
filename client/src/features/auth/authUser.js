import axios from 'axios';
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/user/login";

const authUser = async() => {
    await axios.get(API_URL);
}

export default authUser;