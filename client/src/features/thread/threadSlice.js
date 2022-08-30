import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const API_URL = "http://localhost:5000/thread"


export const threadSlice = createSlice({
    name: "thread",
    initialState: {
        data: [],
        loaded: false
    },
    reducers: {
        addThread: (state, action) => {
            state.data.push(action.payload);
        },
        getThread: (state, action) => {
            state.data = [action.payload];
        }
    }
});


export const getThreadAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_URL}/${data}`);
        dispatch(getThread(response.data));
    }
    catch (err) {
        console.log(err);
    }
}

export const addThreadAsync = (data) => async (dispatch) => {
    try {
        const response = await axios.post(API_URL, data);
        dispatch(addThread(response.data));
    }
    catch (err) {
        console.log(err);
    }
}

export const initializeState = () => async (dispatch) => {
    try {
        const response = await axios.get(API_URL);
        const data = response.data.data
        data.forEach(element => {
            dispatch(addThread(element));
        });
        // dispatch(addThread(response.data));
    }
    catch (err) {
        console.log(err);
    }

}


export const { addThread, getThread } = threadSlice.actions;

export const showThreads = (state) => state.thread.data;
// export const showThreadsSub = async (state) => await axios.get(API_URL).data;

export default threadSlice.reducer;