import { configureStore } from '@reduxjs/toolkit';
import threadReducer from '../features/thread/threadSlice';

export const store = configureStore({
  reducer: {
    thread: threadReducer
  },
});
