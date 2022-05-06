// A slice of Redux state for the dashboard component, with reducers to update its properties

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {
  value: {
    mode: 'dash',
    newUser: false
}};

/* Method for adding a subject and level of study/teaching competency to a user's records.
    This method is used by the Onboarding component, which is nested inside Dashboard after
    a new user has successfully registered */
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
    // Action to update the mode property of Dashboard's state
    setDashMode: (state, action) => {
      state.value.mode = action.payload;
    },
    /* The newUser boolean is used by Dashboard component to control whether or not onboarding component is shown.
      This action sets its value */
    setNewUser: (state, action) => {
      state.value.newUser = action.payload;
    },
    /* When user logs out, this action is used to return the state to its initial state. Called by Nav and DashMenu components */
    resetDashState: state => {
      state.value = {
        mode: 'dash',
        newUser: false
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addSubject.fulfilled, (state) => {
      state.value = initialState.value;
    })
  }
});

export const {setDashMode, setNewUser, resetDashState} = dashReducer.actions;

export default dashReducer.reducer;