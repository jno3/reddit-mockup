import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/user/login";


const checkCookie = () => {
    try{
        return JSON.parse(localStorage.getItem('user')).data;
    }
    catch(err){
        return '';
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        data: checkCookie(),
    },
    reducers: {
        setUser: (state, action) => {
            state.data = action.payload;
        },
        getUser: (state, action) => {
            state.data = [action.payload];
        }
    }
});

export const setUserAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, data);
        localStorage.setItem('user', JSON.stringify({...response.data}));
        dispatch(setUser(response.data.data));
    } catch (err) {
        console.log(err);
    }
    document.location.href="/";
}

export const { setUser, getUser } = userSlice.actions;

export const showUser = (state) => state.user.data;
// export const showThreadsSub = async (state) => await axios.get(API_URL).data;

export default userSlice.reducer;