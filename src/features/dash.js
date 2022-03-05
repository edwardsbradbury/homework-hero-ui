import {createSlice} from '@reduxjs/toolkit';

export const dashReducer = createSlice({
  name: 'dashboard',
  initialState: {
    value: {
      mode: 'dash'
    }},
  reducers: {
    changeDashMode: (state, action) => {
      state.value = action.payload;
    },
  }
});

export const {changeDashMode} = dashReducer.actions;

export default dashReducer.reducer;