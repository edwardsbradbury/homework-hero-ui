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