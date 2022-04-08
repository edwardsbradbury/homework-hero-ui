import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  mode: 'conversations',
  conversations: [],
  recipId: null,
  error: null
}}

export const getConvId = createAsyncThunk(
  'messaging/getConvId',
  async (data, thunkAPI) => {
    const response = await API().get(`get_conv_id?userId=${data.userId}&recipId=${data.recipId}`);
    return response;
  }
);

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
    const response = await API().get(`messages/?convId=${convId}`);
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
    setMessagingMode: (state, action) => {
      state.value.mode = action.payload;
    },
    setRecipId: (state, action) => {
      state.value.recipId = action.payload;
    },
    setConversations: (state, action) => {
      state.value.conversations = action.payload;
    },
    setMessagingError: (state, action) => {
      state.value.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversations.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.error = 'Something went wrong. Check your input and try again';
      } else {
        state.value.conversations = response.conversations;
      }
    })
  }
});

export const {setMessagingMode, setRecipId, setConversations, setMessagingError} = messagingReducer.actions;

export default messagingReducer.reducer;