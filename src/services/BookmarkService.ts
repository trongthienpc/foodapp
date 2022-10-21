import axios from "axios";
import { URL } from "../constants";
import { getToken } from "../store/store";
import { authHeader } from "../utils/General";

// get bookmarks from backend
const getBookmarks = async () => {
  console.log(`BookmarkService.getBookmarks`);
  const token = getToken();
  if (token !== "") {
    try {
      let response = await axios.get(
        `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.BOOKMARK}`,
        {
          headers: authHeader(token),
        }
      );

      // check response return
      if (response.status === 200) {
        return {
          status: true,
          message: `Bookmark data fetched`,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Bookmark data not found`,
        };
      }
    } catch (errors: any) {
      return {
        status: false,
        message: `Bookmark data not found / errors`,
      };
    }
  } else {
    return "Token not found";
  }
};

// add new bookmark
const addBookmark = async ({ restaurantId }: any) => {
  console.log(`BookmarkService.addBookmark`);
  const token = getToken();
  if (token !== "") {
    try {
      let response = await axios.post(
        `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.BOOKMARK}/${restaurantId}`,
        {},
        {
          headers: authHeader(token),
        }
      );

      // check response return
      if (response.status === 200) {
        return {
          status: true,
          message: `Bookmark added successfully`,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Bookmark added failed`,
        };
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: false,
        message: "Bookmark added failed / errors",
      };
    }
  } else {
    return "Token not found";
  }
};

// remove old bookmark
const removeBookmark = async ({ restaurantId }: any) => {
  console.log(`BookmarkService.removeBookmark`);
  const token = getToken();
  if (token !== "") {
    try {
      let response = await axios.delete(
        `${URL.BACKEND_API.BASE_API_URL}${URL.BACKEND_API.BOOKMARK}/${restaurantId}`,
        { headers: authHeader(token) }
      );

      // check response return
      if (response.status === 200) {
        return {
          status: true,
          message: `Bookmark removed successfully`,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: `Bookmark removed failed`,
        };
      }
    } catch (error: any) {
      console.log(error?.message);
      return {
        status: false,
        message: "Bookmark removed failed / errors",
      };
    }
  }
};

export default { getBookmarks, addBookmark, removeBookmark };
