import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  createdAt: null,
  updatedAt: null,
  id: null,
  isConnected: false,
  token: null,
};

const userApiUrl = "http://localhost:3001/api/v1/user";

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }) => {
    try {
      const response = await axios.post(`${userApiUrl}/login`, {
        email: username,
        password: password,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async ({ token }) => {
    try {
      const response = await axios.post(
        `${userApiUrl}/profile`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ token, editedFirstName, editedLastName }) => {
    try {
      const response = await axios.put(
        `${userApiUrl}/profile`,
        {
          firstName: editedFirstName,
          lastName: editedLastName,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw error.message;
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.status && action.payload.status === 200) {
          state.token = action.payload.body.token;
          state.isConnected = true;
        }
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        if (action.payload.status && action.payload.status === 200) {
          Object.assign(state, action.payload.body);
        }
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (action.payload.status && action.payload.status === 200) {
          Object.assign(state, action.payload.body);
        }
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
