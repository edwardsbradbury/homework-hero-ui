import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {
  value: {
    mode: 'dash',
    newUser: false
    // newUser: true
}};

export const addSubject = createAsyncThunk(
  'dashboard/addSubject',
  async (data, thunkApi) => {
    const response = await API().post('add_subject', data);
    return response;
  }
);

export const dashReducer = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    changeDashMode: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.value = initialState.value;
    })
  }
});

export const {changeDashMode} = dashReducer.actions;

export default dashReducer.reducer;