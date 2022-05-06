/* Slice of Redux state for the Search component and its children. With reducers and asyncThunks for updating
  state with or without async API logic */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

/* Method to retrieve all users of opposite userType to the current user, i.e. if logged in user is a client,
  get all tutors. Called by useEffect in the Search component. There's an extraReducer later in this file to
  handle the API's response */
export const getAllUsers = createAsyncThunk(
  'search/getAllUsers',
  async (userType, thunkAPI) => {
    const response = await API().get(`/all_users?userType=${userType}`);
    return response.data;
  }
);

export const searchReducer = createSlice({
  name: 'search',
  initialState: {value: {
    allUsers: [],
    error: ''
  }},
  reducers: {
    /* Method to reset the state of search component when user navigates elsewhere within the app */
    resetSearchState: (state) => {
      state.value.allUsers = [];
      state.value.error = '';
    }
  },
  extraReducers: builder => {
    /* Checking the API's responses to the getAllUsers method (defined above in this file) and accordingly
      updating properties of the state slice */
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'success') {
        state.value.allUsers = response.users;
        state.value.error = '';
      } else {
        state.error = 'Something went wrong fetching users';
      }
    })
  }
});

export const {resetSearchState} = searchReducer.actions;

export default searchReducer.reducer;