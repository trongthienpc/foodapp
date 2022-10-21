import { createSlice } from "@reduxjs/toolkit";

type SliceState = {
  bookmarks: any[];
  isLoading: boolean;
};

const initialState: SliceState = {
  bookmarks: [],
  isLoading: false,
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    // TODO: get bookmarks start
    getBookmarksStarted: (state) => {
      state.isLoading = true;
    },

    // TODO: get bookmarks successfully
    getBookmarksSuccess: (state, action) => {
      state.bookmarks = action.payload;
      state.isLoading = false;
    },

    // TODO: get bookmarks failed
    getBookmarksFailed: (state) => {
      state.isLoading = false;
    },

    // TODO: add book started
    addBookmarkStarted: (state) => {
      state.isLoading = true;
    },

    // TODO: add book successfully
    addBookmarkSuccess: (state, action) => {
      state.bookmarks.push(action.payload);
      state.isLoading = false;
    },

    // TODO: add book failed
    addBookmarkFailed: (state) => {
      state.isLoading = false;
    },

    // TODO: remove bookmark started
    removeBookmarkStarted: (state, action) => {
      state.isLoading = true;
    },

    // TODO: remove book successfully
    removeBookmarkSuccess: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (bookmark) => bookmark.restaurantId !== action.payload
      );
      state.isLoading = false;
    },

    // TODO: remove book failed
    removeBookmarkFailed: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  getBookmarksStarted,
  getBookmarksFailed,
  getBookmarksSuccess,
  addBookmarkFailed,
  addBookmarkStarted,
  addBookmarkSuccess,
  removeBookmarkFailed,
  removeBookmarkStarted,
  removeBookmarkSuccess,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
