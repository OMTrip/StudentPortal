import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  picture: null,
  email: 'student@example.com',
  phone: '123-456-7890',
};

const studentSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { picture, email, phone } = action.payload;
      state.picture = picture || state.picture;
      state.email = email || state.email;
      state.phone = phone || state.phone;
    },
  },
});

export const { updateProfile } = studentSlice.actions;
export default studentSlice.reducer;
