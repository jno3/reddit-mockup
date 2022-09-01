import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from '@reduxjs/toolkit';
import threadReducer from '../features/thread/threadSlice';
import userReducer from '../features/user/userLoginSlice';

// const combinedReducers = combineReducers({
//   thread: threadReducer,
//   user: userReducer
// })

export const store = configureStore({
  reducer: {
    thread: threadReducer,
    user: userReducer
  },
});
