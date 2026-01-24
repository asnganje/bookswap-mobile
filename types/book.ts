export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  user_id: number;
  image_url: string;
}

export interface BookState {
  books: Book [],
  selectedBook: Book | null,
  loading: boolean,
  error: string | null
}