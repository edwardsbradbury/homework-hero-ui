import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

export const doSearch = createAsyncThunk(
  'search/doSearch',
  async (searchParams, thunkAPI) => {
    const response = await API().post('search', searchParams);
    return response.data;
  }
);

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
    results: [],
    errors: []
  }},
  reducers: {
    setResults: (state, action) => {
      state.value.results = action.payload;
    },
    resetSearchState: (state) => {
      state.value.allUsers = [];
      state.value.results = [];
      state.value.errors = [];
    }
  },
  extraReducers: builder => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      const response = action.payload.data;
      if (response.outcome === 'success') {
        state.value.allUsers = response.users;
        state.value.errors = [];
      } else {
        state.errors.push('Something went wrong fetching users');
      }
    })
  }
});

export const {setResults, resetSearchState} = searchReducer.actions;

export default searchReducer.reducer;