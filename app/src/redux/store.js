import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './slice';

const store = configureStore({
  reducer: {
    profile: studentSlice,
  },
});

export default store;
