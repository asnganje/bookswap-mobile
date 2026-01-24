import { createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "../../types/auth";
import { loadStoredUser, loginUser, registerUser } from "../thunks/authThunk";

const initialState: AuthState = {
  user: {} as User,
  loading: false,
  token: undefined,
  error: null,
  msg:""
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    logout(state) {
      state.user = null;
      state.token= null;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(registerUser.pending, (state)=> {
      state.loading = true
    })
    .addCase(registerUser.fulfilled, (state, action)=> {
      state.loading = false;
      state.msg = action.payload.msg
    })
    .addCase(registerUser.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.error?.message || "Failed to register user!"
    })
    .addCase(loginUser.pending, (state)=> {
      state.loading = true;
    })
    .addCase(loginUser.fulfilled, (state, action)=> {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })
    .addCase(loadStoredUser.fulfilled, (state, action)=> {
      if (action.payload) {
        state.user = action.payload.user;
        state.token = action.payload.token
      }
      state.loading = false
    })
  },
})

const authReducer = authSlice.reducer;
export default authReducer;