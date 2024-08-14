// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_type: null,
    user_id: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user_type = action.payload.user_type;
      state.user_id = action.payload.user_id;
    },
    clearUser: (state) => {
      state.user_type = null;
      state.user_id = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user; // Selector

export default userSlice.reducer;
