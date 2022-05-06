/* Slice of Redux state for Messaging, MessageForm, Conversation and Message components, with reducers and
  async thunks for updating state properties with or without async logic */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from './API';

const initialState = {value: {
  mode: 'inbox',
  conversations: [],
  convId: null,
  convIndex: null,
  recipId: null,
  errors: []
}}

/* Method to retrieve a convId to facilitate messaging between the current user and another user.
  The API's /new_message and mark_as_read routes require convId as a paramater. This method is called
  by MessageForm component and possibly also Messaging */
export const getConvId = createAsyncThunk(
  'messaging/getConvId',
  async (data, thunkAPI) => {
    const response = await API().get(`get_conv_id?userId=${data.userId}&recipId=${data.recipId}`);
    return response;
  }
);

/* Method to post the input new message data to my API's /new_message route. There's an extraReducer
  later in this file to handle the API's responses */
export const sendMessage = createAsyncThunk(
  'messaging/sendMessage',
  async (data, thunkAPI) => {
    const response = await API().post('new_message', data);
    return response.data;
  }
);

/* Method to query my API's /conversations route which should return either an array of subarrays representing
  the user's distinct conversations, or an empty array because they haven't had any contact yet */
export const getConversations = createAsyncThunk(
  'messaging/getConversations',
  async (userId, thunkAPI) => {
    const response = await API().get(`conversations?userId=${userId}`);
    return response.data;
  }
);

/* Method to mark all messages in the given conversation (where the recipId is current user's ID) as read */
export const markAsRead = createAsyncThunk(
  'messaging/markAsRead',
  async (data, thunkAPI) => {
    const response = await API().put(`mark_as_read/${data.userId}/${data.convId}`);
    return response.data;
  }
);

/* Method to mark the messages with the specified IDs as deleted for the current user */
export const markAsDeleted = createAsyncThunk(
  'messaging/markAsDeleted',
  async (data, thunkAPI) => {
    const response = await API().post('mark_as_deleted', data);
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
    setConvId: (state, action) => {
      state.value.convId = action.payload;
    },
    setConvIndex: (state, action) => {
      state.value.convIndex = action.payload;
    },
    setRecipId: (state, action) => {
      state.value.recipId = action.payload;
    },
    setConversations: (state, action) => {
      state.value.conversations = action.payload;
    },
    setMessagingErrors: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.value.errors.push(...action.payload);
      } else {
        state.value.errors.push(action.payload);
      }
    },
    clearMessagingErrors: state => {
      state.value.errors = [];
    },
    resetMessagingState: state => {
      state.value = {
        mode: 'inbox',
        conversations: [],
        convId: null,
        convIndex: null,
        recipId: null,
        errors: []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.errors.push('Something went wrong sending your message');
      }
    }).addCase(getConversations.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.errors.push('Something went wrong fetching your conversations');
      } else {
        state.value.conversations = response.conversations;
      }
    }).addCase(getConvId.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.errors.push('Failed to get conversation ID');
      } else {
        state.value.convId = response.data.convId;
      }
    }).addCase(markAsRead.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.errors.push('Failed to mark messages as read');
      }
    }).addCase(markAsDeleted.fulfilled, (state, action) => {
      const response = action.payload;
      if (response.outcome === 'failure') {
        state.value.errors.push(...response.errors);
      }
    })
  }
});

export const {setMessagingMode, setRecipId, setConversations, setConvId, setConvIndex, setMessagingErrors, clearMessagingErrors, resetMessagingState} = messagingReducer.actions;

export default messagingReducer.reducer;