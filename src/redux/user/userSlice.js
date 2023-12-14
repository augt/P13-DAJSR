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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
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
    console.log(token);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      Object.assign(state, initialState);
    },
    /* increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }, */
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /* .addCase(login.pending, (state) => {
        state.status = "loading";
      }) */
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
      }); /* .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.loginError = action.payload;
      }); */
  },
});

export const { logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/* export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
}; */

export default userSlice.reducer;
