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
  initialState: {
    value: {
      mode: 'query',
      message: '',
      results: []
    }},
  reducers: {
    changeSearchMode: (state, action) => {
      state.value.mode = action.payload.mode;
    },
    setResults: (state, action) => {
      state.value.results = action.payload.results;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(doSearch.fulfilled, (state, action) => {
  //     state.value.results = action.payload;
  //   })
  // }
});

export const {changeSearchMode, setResults} = searchReducer.actions;

export default searchReducer.reducer;