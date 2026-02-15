import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import api from "../../api/client";

export const createBook = createAsyncThunk(
  "books/createBook",
  async (payload: FormData, {rejectWithValue})=>{
    
    try {
      const response = await api.post("/books", payload)
      return response.data
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response?.data)
    }
  }
)

export const getBook = createAsyncThunk(
  "books/getBook",
  async(id: number, {rejectWithValue})=> {
    try {
      const response = await api.get(`/books/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async(_, {rejectWithValue})=> {
    try {
      const response = await api.get("books")
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async({id, formData}: {id:number, formData: FormData}, {rejectWithValue})=> {
    try {
      const response = await api.put(`/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart:form-data"
        }
      });
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  }
)

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async(id: number, {rejectWithValue}) => {
    try {
      await api.delete(`/books/${id}`)
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data)
    }
  }
)