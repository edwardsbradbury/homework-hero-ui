import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

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
    resetSearchState: (state) => {
      state.value.allUsers = [];
      state.value.error = '';
    }
  },
  extraReducers: builder => {
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