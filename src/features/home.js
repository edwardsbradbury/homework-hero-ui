/* Slice of Redux state for the Home component, with reducer to update its mode.
    See the Home component for how the mode variable is used to control which component is rendered */

import {createSlice} from '@reduxjs/toolkit';

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    value: {
      mode: 'splash'
    }},
  reducers: {
    changeMode: (state, action) => {
      state.value.mode = action.payload;
    },
  }
});

export const {changeMode} = homeReducer.actions;

export default homeReducer.reducer;