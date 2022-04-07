import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {
  value: {
    mode: 'dash',
    newUser: false
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
    setDashMode: (state, action) => {
      state.value.mode = action.payload;
    },
    setNewUser: (state, action) => {
      state.value.newUser = action.payload;
    },
    resetDashState: (state) => {
      state.value = initialState.value;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.value = initialState.value;
    })
  }
});

export const {setDashMode, setNewUser, resetDashState} = dashReducer.actions;

export default dashReducer.reducer;