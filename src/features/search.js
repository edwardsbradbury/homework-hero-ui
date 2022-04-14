import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

export const doSearch = createAsyncThunk(
  'search/doSearch',
  async (searchParams, thunkAPI) => {
    const response = await API().post('search', searchParams);
    return response.data;
  }
);

export const searchReducer = createSlice({
  name: 'search',
  initialState: {value: {
    results: []
  }},
  reducers: {
    setResults: (state, action) => {
      state.value.results = action.payload;
    },
    resetSearchState: (state) => {
      state.value.results = [];
    }
  },
});

export const {setResults, resetSearchState} = searchReducer.actions;

export default searchReducer.reducer;