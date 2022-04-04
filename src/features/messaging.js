import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  mode: 'conversations',
  conversations: [],
  recipId: null,
  error: null
}}

export const getConversations = createAsyncThunk(
  'messaging/getConversations',
  async (userId, thunkAPI) => {
    const response = await API().get(`conversations?userId=${userId}`);
    return response.data;
  }
);

export const getMessages = createAsyncThunk(
  'messaging/getMessages',
  async (convId, thunkAPI) => {
    const response = await API().get(`get_messages/${convId}`);
    return response.data;
  }
);

export const sendMessage = createAsyncThunk(
  'messaging/sendMessage',
  async (data, thunkAPI) => {
    const response = await API().post('new_message', data);
    return response.data;
  }
);

export const messagingReducer = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    changeMessagingMode: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.error = 'Something went wrong. Check your input and try again';
      } else {
        state.value.conversations = response.conversations;
        state.value.recipId = null;
      }
    })
  }
});

export const {changeMessagingMode} = messagingReducer.actions;

export default messagingReducer.reducer;