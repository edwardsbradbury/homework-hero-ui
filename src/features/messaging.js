import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  mode: 'conversations',
  conversations: [],
  messages: []
}}

export const getConversations = createAsyncThunk(
  'messaging/getConversations',
  async (userId, thunkAPI) => {
    const response = await API().get(`get_conversations/${userId}`);
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
      state.value.conversations = action.payload;
    })
    .addCase(getMessages.fulfilled, (state, action) => {
      state.value.messages = action.payload;
    })
  }
});

export const {changeMessagingMode} = messagingReducer.actions;

export default messagingReducer.reducer;