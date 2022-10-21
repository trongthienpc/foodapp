// get bookmark

import BookmarkService from "../services/BookmarkService";
import {
  addBookmarkStarted,
  addBookmarkSuccess,
  getBookmarksStarted,
  getBookmarksSuccess,
  removeBookmarkStarted,
  removeBookmarkSuccess,
} from "../store/BookmarkSlice";

export const getBookmarkHelper = async ({ dispatch }: any) => {
  dispatch(getBookmarksStarted);
  // call bookmark service
  try {
    const data = await BookmarkService.getBookmarks();
    console.log(`bookmarkHelper.getBookmarks:  ${data}`);
    dispatch(getBookmarksSuccess(data));
    return data;
  } catch (error: any) {
    console.log(`bookmarkHelper.getBookmarks:  ${error?.message}`);
  }
};

// add bookmark
export const addBookmarkHelper = async ({ dispatch, restaurantId }: any) => {
  dispatch(addBookmarkStarted);
  try {
    const data = await BookmarkService.addBookmark(restaurantId);
    dispatch(addBookmarkSuccess(data));
  } catch (error: any) {
    console.log(`bookmarkHelper.addBookmark:  ${error?.message}`);
  }
};

// remove bookmark
export const removeBookmarkHelper = async ({ dispatch, restaurantId }: any) => {
  dispatch(removeBookmarkStarted);
  try {
    const data = await BookmarkService.removeBookmark(restaurantId);
    dispatch(removeBookmarkSuccess(data));
  } catch (error: any) {
    console.log(`bookmarkHelper.deleteBookmark:  ${error?.message}`);
  }
};
