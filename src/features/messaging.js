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
    setConversations: (state, action) => {
      state.value.conversations = action.payload;
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
  extraReducers: (builder) => {
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
    })
  }
});

export const {setMessagingMode, setRecipId, setConversations, setConvId, setConvIndex, setMessagingErrors, clearMessagingErrors, resetMessagingState} = messagingReducer.actions;

export default messagingReducer.reducer;