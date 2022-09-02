import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useParams } from 'react-router';

const { name } = useParams()
console.log(name)

const API_URL = `http://localhost:5000/r/${name}`;
console.log(API_URL)

export const subSlice = createSlice({
    name: "sub",
    initialState: {
        data: ''
    },
    reducers:{
        setData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const setDataAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        // localStorage.setItem('user', JSON.stringify({...response.data}));
        console.log(response);
        dispatch(setUser(response.data.data));
    } catch (err) {
        console.log(err);
    }
}