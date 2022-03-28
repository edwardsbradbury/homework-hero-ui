import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  mode: 'conversations',
  conversations: [],
  recipId: null
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
      state.value.conversations = action.payload.messages;
    })
    .addCase(getMessages.fulfilled, (state, action) => {
      state.value.messages = action.payload;
    })
  }
});

export const {changeMessagingMode} = messagingReducer.actions;

export default messagingReducer.reducer;