import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

export const addSubject = createAsyncThunk(
  'dash/addSubject',
  async (data, thunkApi) => {
    const response = await API().post('add_subject', data);
    return response;
  }
);

export const dashReducer = createSlice({
  name: 'dashboard',
  initialState: {
    value: {
      mode: 'dash',
      newUser: false
      // newUser: true
    }},
  reducers: {
    changeDashMode: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.value = {mode: 'dash', newUser: false};
    })
  }
});

export const {changeDashMode} = dashReducer.actions;

export default dashReducer.reducer;