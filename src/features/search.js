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
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doSearch.fulfilled, (state, action) => {
      // state.value.results = action.payload;
      const result = action.payload.unwrap();
      console.log(result);
    })
  }
});

export const {changeSearchMode} = searchReducer.actions;

export default searchReducer.reducer;