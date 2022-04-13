import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {
  value: {
    results: []
  }};

export const doSearch = createAsyncThunk(
  'search/doSearch',
  async (searchParams, thunkAPI) => {
    const response = await API().post('search', searchParams);
    return response.data;
  }
);

export const searchReducer = createSlice({
  name: 'search',
  initialState: JSON.parse(JSON.stringify(initialState)),
  reducers: {
    setResults: (state, action) => {
      state.value.results = action.payload;
    },
    resetSearchState: (state) => {
      state = initialState;
    }
  },
});

export const {setResults, resetSearchState} = searchReducer.actions;

export default searchReducer.reducer;