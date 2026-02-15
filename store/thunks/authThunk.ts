import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/client";
import * as SecureStorage from "expo-secure-store"
import { User } from "../../types/auth";

interface RegisterData {
  user: {
    fullname: string,
    email:string,
    password:string
  }
}

interface LoginData {
  user: {
    email:string;
    password:string
  }
}

export const registerUser = createAsyncThunk<
any,
RegisterData,
{rejectValue: string}
>(
  "auth/registerUser",
  async(userData, {rejectWithValue})=> {
    try {
      const response = await api.post("/users", userData)
      return response.data
    } catch (error:any ) {     
      return rejectWithValue(error.response?.data?.error || "Registration failed!")
    }
  }
)

export const loginUser = createAsyncThunk<
  any,
  LoginData,
  {rejectValue: string}
>(
  "auth/loginUser",
  async(userData: LoginData, {rejectWithValue})=> {   
    try {
      const response = await api.post("/users/sign_in", userData)
      await SecureStorage.setItemAsync("userToken", response.data.token)
      await SecureStorage.setItemAsync("user", JSON.stringify(response.data.user))
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Login failed!")
    }
  }
)

export const loadStoredUser = createAsyncThunk("auth/loadStoredUser", async()=> {
  try {
    const token = await SecureStorage.getItemAsync("userToken")
    const userJson = await SecureStorage.getItemAsync("userData")

    if (token && userJson) {
      return {
        token,
        user: JSON.parse(userJson) as User
      }     
    }
    return null;
  } catch (error) {
    return null
  }
})