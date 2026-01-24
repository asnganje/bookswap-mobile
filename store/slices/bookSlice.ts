import { createSlice } from "@reduxjs/toolkit";
import { BookState } from "../../types/book";
import { createBook, deleteBook, getBook, getBooks, updateBook } from "../thunks/booksThunk";

const initialState: BookState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null
}
const bookSlice = createSlice({
  name:"books",
  initialState,
  reducers:{},
  extraReducers: (builder)=>{
    builder
    .addCase(createBook.pending, (state)=> {
      state.loading = true
    })
    .addCase(createBook.fulfilled, (state, action)=> {
      state.loading = false;
      state.books = [action.payload, ...state.books]
    })
    .addCase(createBook.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.error.message || "Failed to add a book"
    })
    .addCase(getBook.pending, (state)=> {
      state.loading = true
    })
    .addCase(getBook.fulfilled, (state, action)=> {
      state.loading = false;
      state.selectedBook = action.payload
    })
    .addCase(getBook.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.error?.message || "Failed to fetch the book"
    })
    .addCase(getBooks.pending, (state)=> {
      state.loading = true
    })
    .addCase(getBooks.fulfilled, (state, action)=> {
      state.loading = false;
      state.books = action.payload;
    })
    .addCase(getBooks.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.error?.message || "Failed to fetch books" 
    })
    .addCase(updateBook.pending, (state)=> {
      state.loading = true;
    })
    .addCase(updateBook.fulfilled, (state, action)=> {
      state.loading = false;
      state.books = state.books.map((book)=> book.id === action.payload.id ? action.payload : book)
    })
    .addCase(updateBook.rejected, (state, action)=> {
      state.loading = false;
      state.error = action.error?.message || "Failed to update the book!"
    })

    .addCase(deleteBook.pending, (state,action)=> {
      state.loading = true;
    })
    .addCase(deleteBook.fulfilled, (state, action)=> {
      state.loading = false;
      state.books = state.books.filter((book)=> book.id !== action.payload)
    })
    .addCase(deleteBook.rejected, (state,action)=> {
      state.loading = false;
      state.error = action.error?.message || "Failed to delete the book"
    })
  }

})

const booksReducer = bookSlice.reducer;
export default booksReducer;